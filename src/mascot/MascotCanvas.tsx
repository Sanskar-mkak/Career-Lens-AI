import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RobotMascot } from './mascotModel.js';
import { damp } from './geometry.js';
import { useTheme } from '@/context/ThemeContext';
import {
  MascotSemanticState,
  MascotExpression,
  MascotAnimation,
  SEMANTIC_STATE_CONFIGS,
  CameraPreset,
  CAMERA_PRESETS,
} from './types';
import styles from './MascotCanvas.module.css';

export interface MascotCanvasProps {
  semanticState?: MascotSemanticState;
  expression?: MascotExpression;
  animation?: MascotAnimation;
  cameraPreset?: CameraPreset;
  showPlatform?: boolean;
  transparent?: boolean;
  interactive?: boolean;
  enableMouseOrbit?: boolean;
  enableWheelZoom?: boolean;
  allowAutonomousIdle?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  speechBubble?: string | null;
  showInteractiveHint?: boolean;
  onLoaded?: () => void;
  offsetHeadX?: number;
}

export const MascotCanvas: React.FC<MascotCanvasProps> = ({
  semanticState,
  expression: propExpression,
  animation: propAnimation,
  cameraPreset = 'hero',
  showPlatform = true,
  transparent = false,
  interactive = true,
  enableMouseOrbit = true,
  enableWheelZoom = true,
  allowAutonomousIdle = true,
  width = '100%',
  height = '100%',
  className = '',
  speechBubble,
  showInteractiveHint = true,
  onLoaded,
  offsetHeadX = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const robotRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Spherical camera orbit offsets
  const orbitTheta = useRef<number>(0);
  const orbitPhi = useRef<number>(0);
  const targetOrbitTheta = useRef<number>(0);
  const targetOrbitPhi = useRef<number>(0);

  // Wheel zoom offset
  const zoomOffset = useRef<number>(0);
  const zoomOffsetTarget = useRef<number>(0);
  const lastWheelTime = useRef<number>(0);

  // Autonomous idle behavior timers & state
  const idleTimerRef = useRef<number>(0);
  const nextIdleActionTimeRef = useRef<number>(6.0); // seconds until next autonomous action
  const activeIdleActionRef = useRef<string | null>(null);
  const idleActionTimeoutRef = useRef<number | null>(null);

  const { theme } = useTheme();

  // Derive active expression and animation from semantic state or direct props
  const stateConfig = semanticState ? SEMANTIC_STATE_CONFIGS[semanticState] : null;
  const activeExpression = propExpression ?? stateConfig?.expression ?? 'default';
  const activeAnimation = propAnimation ?? stateConfig?.animation ?? 'idle';
  const displayedMessage = speechBubble ?? stateConfig?.defaultMessage ?? null;

  // Determine if autonomous behavior is allowed for current state
  const isEligibleForAutonomous =
    allowAutonomousIdle &&
    (semanticState === undefined ||
      semanticState === 'IDLE' ||
      semanticState === 'GREETING' ||
      semanticState === 'HELPING') &&
    !isDraggingRef.current;

  // Initialize Three.js scene and RobotMascot
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const widthPx = Math.max(1, container.clientWidth);
    const heightPx = Math.max(1, container.clientHeight);

    // Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(widthPx, heightPx, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const preset = CAMERA_PRESETS[cameraPreset] || CAMERA_PRESETS.hero;
    const aspect = widthPx / heightPx;
    const camera = new THREE.PerspectiveCamera(preset.fov, aspect, 0.1, 50);
    camera.position.set(...preset.position);
    camera.lookAt(...preset.target);
    cameraRef.current = camera;

    // Instantiate RobotMascot with transparency and platform options
    const robot = new RobotMascot(scene, {
      transparent,
      showPlatform,
      showShadow: true,
      theme,
      expression: activeExpression,
      animation: activeAnimation,
    });
    if (offsetHeadX !== 0) {
      robot.root.position.x = offsetHeadX;
    }
    scene.add(robot.root);
    robotRef.current = robot;

    if (onLoaded) {
      onLoaded();
    }

    // Animation & RAF loop
    const clock = new THREE.Clock();
    let lastTime = performance.now();

    const renderLoop = () => {
      animFrameId.current = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current || document.hidden) return;

      const now = performance.now();
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(0.05, Math.max(0, rawDt));

      // Update robot
      if (robotRef.current) {
        robotRef.current.update(dt, clock.getElapsedTime());
      }

      // Orbital Camera Update
      const presetConfig = CAMERA_PRESETS[cameraPreset] || CAMERA_PRESETS.hero;
      const targetVec = new THREE.Vector3(...presetConfig.target);
      const defaultPosVec = new THREE.Vector3(...presetConfig.position);

      const toCam = defaultPosVec.clone().sub(targetVec);
      const defaultRadius = toCam.length();
      const defaultPhi = Math.acos(toCam.y / defaultRadius);
      const defaultTheta = Math.atan2(toCam.x, toCam.z);

      if (enableMouseOrbit) {
        if (!isDraggingRef.current) {
          // SMOOTH RETURN TO DEFAULT ON RELEASE:
          // Smoothly decays angles back to 0 without any snapping
          targetOrbitTheta.current = damp(targetOrbitTheta.current, 0, 3.2, dt);
          targetOrbitPhi.current = damp(targetOrbitPhi.current, 0, 3.2, dt);
        }
        orbitTheta.current = damp(orbitTheta.current, targetOrbitTheta.current, 10.0, dt);
        orbitPhi.current = damp(orbitPhi.current, targetOrbitPhi.current, 10.0, dt);
      } else {
        orbitTheta.current = damp(orbitTheta.current, 0, 4.0, dt);
        orbitPhi.current = damp(orbitPhi.current, 0, 4.0, dt);
      }

      // Wheel zoom decay back to default after inactivity
      if (enableWheelZoom) {
        if (now - lastWheelTime.current > 1400) {
          zoomOffsetTarget.current = damp(zoomOffsetTarget.current, 0, 1.8, dt);
        }
        zoomOffset.current = damp(zoomOffset.current, zoomOffsetTarget.current, 8.0, dt);
      }

      // Compute final camera coordinates
      const effectiveRadius = Math.max(3.2, Math.min(14.5, defaultRadius + zoomOffset.current));
      const effectivePhi = Math.max(0.16, Math.min(Math.PI - 0.16, defaultPhi + orbitPhi.current));
      const effectiveTheta = defaultTheta + orbitTheta.current;

      const camX = targetVec.x + effectiveRadius * Math.sin(effectivePhi) * Math.sin(effectiveTheta);
      const camY = targetVec.y + effectiveRadius * Math.cos(effectivePhi);
      const camZ = targetVec.z + effectiveRadius * Math.sin(effectivePhi) * Math.cos(effectiveTheta);

      camera.position.set(camX, camY, camZ);
      camera.lookAt(targetVec);

      // Autonomous living behavior update (only during genuine idle)
      if (isEligibleForAutonomous && !activeIdleActionRef.current) {
        idleTimerRef.current += dt;
        if (idleTimerRef.current >= nextIdleActionTimeRef.current) {
          idleTimerRef.current = 0;
          nextIdleActionTimeRef.current = 5.0 + Math.random() * 6.0; // Random interval between 5-11 seconds

          const roll = Math.random();
          if (roll < 0.45 && robotRef.current) {
            // Natural glance/look around
            const gazeX = (Math.random() - 0.5) * 0.7;
            const gazeY = (Math.random() - 0.5) * 0.4;
            robotRef.current.lookAt(gazeX, gazeY);
            activeIdleActionRef.current = 'glance';
            idleActionTimeoutRef.current = window.setTimeout(() => {
              if (robotRef.current) robotRef.current.clearLookAt();
              activeIdleActionRef.current = null;
            }, 1800);
          } else if (roll < 0.72 && robotRef.current) {
            // Natural double blink
            robotRef.current.blink();
          } else if (roll < 0.90 && robotRef.current) {
            // Curious subtle gesture
            robotRef.current.setExpression('curious');
            activeIdleActionRef.current = 'curious';
            idleActionTimeoutRef.current = window.setTimeout(() => {
              if (robotRef.current) robotRef.current.setExpression(activeExpression);
              activeIdleActionRef.current = null;
            }, 2000);
          } else if (robotRef.current) {
            // Rare gentle greeting wave
            robotRef.current.playAnimation('wave');
            activeIdleActionRef.current = 'wave';
            idleActionTimeoutRef.current = window.setTimeout(() => {
              if (robotRef.current) robotRef.current.playAnimation(activeAnimation);
              activeIdleActionRef.current = null;
            }, 2200);
          }
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w <= 0 || h <= 0) continue;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h, false);
      }
    });
    resizeObserver.observe(container);

    // Visibility handling with IntersectionObserver
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Wheel listener attached ONLY to canvas container (scoped to mascot, does NOT hijack page scrolling)
    const handleWheel = (e: WheelEvent) => {
      if (!enableWheelZoom || !interactive) return;
      // Intercept wheel zoom only on mascot
      e.preventDefault();
      zoomOffsetTarget.current += e.deltaY * 0.0035;
      zoomOffsetTarget.current = Math.max(-2.8, Math.min(3.5, zoomOffsetTarget.current));
      lastWheelTime.current = performance.now();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (idleActionTimeoutRef.current) clearTimeout(idleActionTimeoutRef.current);
      container.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (robotRef.current) {
        robotRef.current.dispose();
        robotRef.current = null;
      }
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [cameraPreset, showPlatform, transparent, offsetHeadX, enableMouseOrbit, enableWheelZoom]);

  // Sync theme
  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.setTheme(theme);
    }
  }, [theme]);

  // Sync expression
  useEffect(() => {
    if (idleActionTimeoutRef.current) {
      clearTimeout(idleActionTimeoutRef.current);
      activeIdleActionRef.current = null;
    }
    if (robotRef.current) {
      robotRef.current.setExpression(activeExpression);
    }
  }, [activeExpression]);

  // Sync animation
  useEffect(() => {
    if (idleActionTimeoutRef.current) {
      clearTimeout(idleActionTimeoutRef.current);
      activeIdleActionRef.current = null;
    }
    if (robotRef.current) {
      robotRef.current.playAnimation(activeAnimation);
    }
  }, [activeAnimation]);

  // Left mouse drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || !enableMouseOrbit) return;
      if (e.button !== 0) return; // Left click only

      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      // Cancel any active autonomous action
      if (idleActionTimeoutRef.current) {
        clearTimeout(idleActionTimeoutRef.current);
        activeIdleActionRef.current = null;
      }

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [interactive, enableMouseOrbit]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;

      if (isDraggingRef.current && enableMouseOrbit) {
        const dx = (e.clientX - dragStartRef.current.x) * 0.007;
        const dy = (e.clientY - dragStartRef.current.y) * 0.007;

        targetOrbitTheta.current += dx;
        targetOrbitPhi.current = Math.max(-0.72, Math.min(0.72, targetOrbitPhi.current + dy));
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      } else if (!isDraggingRef.current && robotRef.current) {
        // Natural gaze tracking when hovering without dragging
        const rect = containerRef.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        robotRef.current.lookAt(nx * 0.95, ny * 0.75);
      }
    },
    [interactive, enableMouseOrbit]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!isDraggingRef.current && robotRef.current) {
      robotRef.current.clearLookAt();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.mascotContainer} ${isDragging ? styles.isDragging : ''} ${className}`}
      style={{ width, height }}
      role="region"
      aria-label="3D CareerLens Companion Mascot"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {displayedMessage && (
        <div className={styles.speechBubble} aria-live="polite">
          <span>{displayedMessage}</span>
        </div>
      )}

      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.webglCanvas} />
      </div>

      {interactive && enableMouseOrbit && showInteractiveHint && (
        <div className={styles.interactiveHint} aria-hidden="true">
          <span className={styles.hintDot} />
          <span>Drag to orbit · Scroll to zoom</span>
        </div>
      )}
    </div>
  );
};

export default MascotCanvas;
