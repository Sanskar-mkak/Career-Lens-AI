import * as THREE from 'three';
import {
  clamp,
  curvedRoundedPanelGeometry,
  damp,
  disposeObject,
  latheProfileGeometry,
  lerp,
  makeTube,
  roundedPanelGeometry,
  superellipsoidGeometry,
} from './geometry.js';

const TAU = Math.PI * 2;

const EXPRESSION_ALIASES = {
  friendly: 'default',
  wink: 'wink',
  winking: 'wink',
  focused: 'focused',
  typing: 'focused',
  'typing / focused': 'focused',
  celebrating: 'excited',
};

const MATERIAL_PALETTE = {
  light: {
    shell: 0xeaf2f8,
    shellSecondary: 0xc8dbe9,
    shellShadow: 0xa8c0d2,
    shellEdge: 0xb5cfdf,
    accent: 0x168cf2,
    accentBright: 0x38c8ff,
    accentSoft: 0x8bdcff,
    eye: 0x25caff,
    visor: 0x02050a,
    visorEdge: 0x0a1624,
    dark: 0x101a28,
    joint: 0x172638,
    floor: 0xeaf6ff,
    floorGlow: 0x5ed7ff,
    key: 0xffffff,
    fill: 0x8bdcff,
    rim: 0x258dff,
    warm: 0x65d9ff,
  },
  dark: {
    shell: 0x1c2732,
    shellSecondary: 0x2d3b49,
    shellShadow: 0x101820,
    shellEdge: 0x4b5d6e,
    accent: 0xff5b2c,
    accentBright: 0xff9a54,
    accentSoft: 0xffc18a,
    eye: 0xff6b32,
    visor: 0x010204,
    visorEdge: 0x11151c,
    dark: 0x090d13,
    joint: 0x202a37,
    floor: 0x080b10,
    floorGlow: 0xff5e2c,
    key: 0xffd8bf,
    fill: 0xff7441,
    rim: 0xff5425,
    warm: 0xff6b32,
  },
};

const EXPRESSIONS = {
  default: {
    label: 'DEFAULT / FRIENDLY',
    head: { pitch: 0, yaw: 0, roll: 0, lift: 0 },
    eyes: {
      left: { scaleX: 1, scaleY: 1, rotation: 0, x: 0, y: 0, arc: 0 },
      right: { scaleX: 1, scaleY: 1, rotation: 0, x: 0, y: 0, arc: 0 },
    },
    mouth: { curve: 0.36, open: 0, width: 0.74, centerY: -0.43, tilt: 0 },
    glow: 1,
  },
  happy: {
    label: 'HAPPY',
    head: { pitch: -0.035, yaw: 0, roll: 0.06, lift: 0.025 },
    eyes: {
      left: { scaleX: 1.03, scaleY: 0.2, rotation: -0.08, x: 0, y: 0.04, arc: 1 },
      right: { scaleX: 1.03, scaleY: 0.2, rotation: 0.08, x: 0, y: 0.04, arc: 1 },
    },
    mouth: { curve: 0.82, open: 0.03, width: 0.8, centerY: -0.43, tilt: 0 },
    glow: 1.16,
  },
  wink: {
    label: 'WINKING',
    head: { pitch: -0.025, yaw: 0.04, roll: 0.1, lift: 0.02 },
    eyes: {
      left: { scaleX: 1, scaleY: 0.18, rotation: -0.05, x: 0, y: 0.03, arc: 1 },
      right: { scaleX: 1.08, scaleY: 1, rotation: 0, x: 0, y: 0, arc: 0 },
    },
    mouth: { curve: 0.65, open: 0, width: 0.72, centerY: -0.43, tilt: 0.06 },
    glow: 1.08,
  },
  thinking: {
    label: 'THINKING',
    head: { pitch: 0.04, yaw: -0.14, roll: -0.18, lift: -0.02 },
    eyes: {
      left: { scaleX: 0.92, scaleY: 0.78, rotation: 0, x: 0.03, y: 0.1, arc: 0 },
      right: { scaleX: 0.92, scaleY: 0.78, rotation: 0, x: -0.03, y: 0.1, arc: 0 },
    },
    mouth: { curve: 0.12, open: 0, width: 0.58, centerY: -0.46, tilt: -0.08 },
    glow: 0.9,
  },
  excited: {
    label: 'EXCITED',
    head: { pitch: -0.05, yaw: 0, roll: 0, lift: 0.07 },
    eyes: {
      left: { scaleX: 1.18, scaleY: 1.2, rotation: 0, x: 0, y: 0.02, arc: 0 },
      right: { scaleX: 1.18, scaleY: 1.2, rotation: 0, x: 0, y: 0.02, arc: 0 },
    },
    mouth: { curve: 0.92, open: 0.16, width: 0.88, centerY: -0.44, tilt: 0 },
    glow: 1.4,
  },
  curious: {
    label: 'CURIOUS',
    head: { pitch: 0.015, yaw: 0.12, roll: 0.2, lift: 0.035 },
    eyes: {
      left: { scaleX: 1.08, scaleY: 1.05, rotation: -0.05, x: -0.02, y: 0.04, arc: 0 },
      right: { scaleX: 0.84, scaleY: 0.94, rotation: 0.06, x: 0.04, y: 0.01, arc: 0 },
    },
    mouth: { curve: 0.42, open: 0.01, width: 0.64, centerY: -0.43, tilt: 0.12 },
    glow: 1.06,
  },
  focused: {
    label: 'TYPING / FOCUSED',
    head: { pitch: 0.11, yaw: 0, roll: 0, lift: -0.045 },
    eyes: {
      left: { scaleX: 0.8, scaleY: 0.48, rotation: 0, x: 0, y: 0.02, arc: 0 },
      right: { scaleX: 0.8, scaleY: 0.48, rotation: 0, x: 0, y: 0.02, arc: 0 },
    },
    mouth: { curve: 0.12, open: 0, width: 0.58, centerY: -0.46, tilt: 0 },
    glow: 0.86,
  },
  surprised: {
    label: 'SURPRISED',
    head: { pitch: -0.11, yaw: 0, roll: 0, lift: 0.09 },
    eyes: {
      left: { scaleX: 1.2, scaleY: 1.32, rotation: 0, x: 0, y: 0.02, arc: 0 },
      right: { scaleX: 1.2, scaleY: 1.32, rotation: 0, x: 0, y: 0.02, arc: 0 },
    },
    mouth: { curve: 0.08, open: 0.24, width: 0.42, centerY: -0.44, tilt: 0 },
    glow: 1.55,
  },
  sad: {
    label: 'SAD',
    head: { pitch: 0.14, yaw: 0, roll: -0.05, lift: -0.09 },
    eyes: {
      left: { scaleX: 0.88, scaleY: 0.76, rotation: -0.18, x: 0, y: -0.03, arc: 0 },
      right: { scaleX: 0.88, scaleY: 0.76, rotation: 0.18, x: 0, y: -0.03, arc: 0 },
    },
    mouth: { curve: -0.62, open: 0, width: 0.62, centerY: -0.43, tilt: 0 },
    glow: 0.72,
  },
  confused: {
    label: 'CONFUSED',
    head: { pitch: 0.04, yaw: -0.18, roll: 0.26, lift: 0.01 },
    eyes: {
      left: { scaleX: 0.92, scaleY: 1.02, rotation: -0.12, x: 0.04, y: 0.06, arc: 0 },
      right: { scaleX: 0.75, scaleY: 0.72, rotation: 0.12, x: -0.04, y: 0.02, arc: 0 },
    },
    mouth: { curve: -0.08, open: 0.05, width: 0.56, centerY: -0.45, tilt: -0.12 },
    glow: 0.94,
  },
  determined: {
    label: 'DETERMINED',
    head: { pitch: 0.07, yaw: 0, roll: 0, lift: 0.015 },
    eyes: {
      left: { scaleX: 0.86, scaleY: 0.55, rotation: -0.05, x: 0, y: 0.015, arc: 0 },
      right: { scaleX: 0.86, scaleY: 0.55, rotation: 0.05, x: 0, y: 0.015, arc: 0 },
    },
    mouth: { curve: 0.48, open: 0, width: 0.7, centerY: -0.44, tilt: 0 },
    glow: 1.12,
  },
  laughing: {
    label: 'LAUGHING',
    head: { pitch: -0.08, yaw: 0, roll: 0.04, lift: 0.06 },
    eyes: {
      left: { scaleX: 1.08, scaleY: 0.18, rotation: -0.08, x: 0, y: 0.04, arc: 1 },
      right: { scaleX: 1.08, scaleY: 0.18, rotation: 0.08, x: 0, y: 0.04, arc: 1 },
    },
    mouth: { curve: 1, open: 0.22, width: 0.94, centerY: -0.44, tilt: 0 },
    glow: 1.25,
  },
  sleepy: {
    label: 'SLEEPY',
    head: { pitch: 0.16, yaw: 0.04, roll: 0.08, lift: -0.11 },
    eyes: {
      left: { scaleX: 0.92, scaleY: 0.38, rotation: 0, x: 0, y: -0.01, arc: 0 },
      right: { scaleX: 0.92, scaleY: 0.38, rotation: 0, x: 0, y: -0.01, arc: 0 },
    },
    mouth: { curve: 0.06, open: 0.02, width: 0.5, centerY: -0.46, tilt: 0 },
    glow: 0.68,
  },
};

function cloneExpression(expression) {
  return {
    ...expression,
    head: { ...expression.head },
    eyes: {
      left: { ...expression.eyes.left },
      right: { ...expression.eyes.right },
    },
    mouth: { ...expression.mouth },
  };
}

function blendExpression(a, b, amount) {
  const result = cloneExpression(a);
  const scalarKeys = ['glow'];
  const headKeys = ['pitch', 'yaw', 'roll', 'lift'];
  const eyeKeys = ['scaleX', 'scaleY', 'rotation', 'x', 'y', 'arc'];
  const mouthKeys = ['curve', 'open', 'width', 'centerY', 'tilt'];
  scalarKeys.forEach((key) => { result[key] = lerp(a[key], b[key], amount); });
  headKeys.forEach((key) => { result.head[key] = lerp(a.head[key], b.head[key], amount); });
  ['left', 'right'].forEach((side) => eyeKeys.forEach((key) => {
    result.eyes[side][key] = lerp(a.eyes[side][key], b.eyes[side][key], amount);
  }));
  mouthKeys.forEach((key) => { result.mouth[key] = lerp(a.mouth[key], b.mouth[key], amount); });
  return result;
}

function createPose() {
  return {
    rootY: 0,
    rootPitch: 0,
    rootRoll: 0,
    torsoScale: 1,
    headPitch: 0,
    headYaw: 0,
    headRoll: 0,
    headLift: 0,
    neckPitch: 0,
    leftShoulderPitch: 0.03,
    leftShoulderYaw: 0,
    leftShoulderRoll: -0.16,
    leftElbowPitch: 0.02,
    leftElbowYaw: 0,
    leftElbowRoll: 0.1,
    leftWristPitch: 0,
    leftWristYaw: 0,
    leftWristRoll: 0,
    rightShoulderPitch: 0.03,
    rightShoulderYaw: 0,
    rightShoulderRoll: 0.16,
    rightElbowPitch: 0.02,
    rightElbowYaw: 0,
    rightElbowRoll: -0.1,
    rightWristPitch: 0,
    rightWristYaw: 0,
    rightWristRoll: 0,
    leftLegPitch: 0,
    leftLegRoll: -0.025,
    rightLegPitch: 0,
    rightLegRoll: 0.025,
    leftFingers: [
      [0.02, -0.04, 1],
      [0.02, 0, 1],
      [0.02, 0.04, 1],
      [0.02, 0.08, 1],
      [0.08, 0.62, 1],
    ],
    rightFingers: [
      [0.02, 0.04, 1],
      [0.02, 0, 1],
      [0.02, -0.04, 1],
      [0.02, -0.08, 1],
      [0.08, -0.62, 1],
    ],
    card: 0,
    particles: 0,
  };
}

function copyPose(pose) {
  const result = { ...pose };
  result.leftFingers = pose.leftFingers.map((finger) => [...finger]);
  result.rightFingers = pose.rightFingers.map((finger) => [...finger]);
  return result;
}

function blendPose(from, to, amount) {
  const result = {};
  Object.keys(to).forEach((key) => {
    if (Array.isArray(to[key]) && Array.isArray(to[key][0])) {
      result[key] = to[key].map((row, index) => row.map((value, column) => lerp(from[key][index][column], value, amount)));
    } else {
      result[key] = lerp(from[key], to[key], amount);
    }
  });
  return result;
}

function setFinger(pose, side, index, x, z, scale = 1) {
  const key = side === 'left' ? 'leftFingers' : 'rightFingers';
  pose[key][index] = [x, z, scale];
}

function applyHandPose(pose, side, type) {
  const sign = side === 'left' ? -1 : 1;
  if (type === 'open') {
    for (let i = 0; i < 4; i += 1) setFinger(pose, side, i, -0.12 + i * 0.04, sign * (0.22 - i * 0.09), 1);
    setFinger(pose, side, 4, -0.18, sign * 0.8, 1);
  } else if (type === 'point') {
    setFinger(pose, side, 0, -Math.PI * 0.5, 0, 1.35);
    setFinger(pose, side, 1, 0.08, sign * 0.08, 0.16);
    setFinger(pose, side, 2, 0.1, -sign * 0.02, 0.14);
    setFinger(pose, side, 3, 0.12, -sign * 0.1, 0.14);
    setFinger(pose, side, 4, 0.08, sign * 0.76, 0.85);
  } else if (type === 'present') {
    for (let i = 0; i < 4; i += 1) setFinger(pose, side, i, 0.18, sign * (0.18 - i * 0.08), 1);
    setFinger(pose, side, 4, 0.12, sign * 0.95, 1);
  } else if (type === 'tap') {
    for (let i = 0; i < 4; i += 1) setFinger(pose, side, i, 0.16, sign * (0.12 - i * 0.04), 0.92);
    setFinger(pose, side, 4, 0.1, sign * 0.8, 0.92);
  } else if (type === 'pinch') {
    setFinger(pose, side, 0, -0.25, sign * 0.08, 0.9);
    setFinger(pose, side, 1, -0.25, -sign * 0.08, 0.9);
    setFinger(pose, side, 2, 0.15, -sign * 0.1, 0.75);
    setFinger(pose, side, 3, 0.18, -sign * 0.15, 0.7);
    setFinger(pose, side, 4, 0.12, sign * 0.72, 0.9);
  } else {
    for (let i = 0; i < 4; i += 1) setFinger(pose, side, i, 0.02, sign * (0.04 - i * 0.02), 1);
    setFinger(pose, side, 4, 0.08, sign * 0.62, 1);
  }
}

function makeFinGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.22, 0);
  shape.quadraticCurveTo(-0.21, 0.3, -0.1, 0.54);
  shape.quadraticCurveTo(0.0, 0.76, 0.11, 0.68);
  shape.quadraticCurveTo(0.2, 0.55, 0.19, 0.3);
  shape.quadraticCurveTo(0.18, 0.1, 0.1, 0);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    curveSegments: 10,
    bevelSize: 0.045,
    bevelThickness: 0.045,
  });
  geometry.translate(0, 0, -0.09);
  geometry.computeVertexNormals();
  return geometry;
}

class ThemeController {
  constructor(scene, robot) {
    this.scene = scene;
    this.robot = robot;
    this.theme = 'light';
    this.targetTheme = 'light';
    this.profiles = [];
    this.sceneBackground = new THREE.Color(MATERIAL_PALETTE.light.floor);
    this.sceneFog = new THREE.Color(MATERIAL_PALETTE.light.floor);
    this.scratchColor = new THREE.Color();
    this.targetFloorColor = new THREE.Color(MATERIAL_PALETTE.light.floor);
  }

  register(material, key, options = {}) {
    if (!material || this.profiles.some((profile) => profile.material === material)) return material;
    const profile = {
      material,
      key,
      light: {
        color: new THREE.Color(options.lightColor ?? MATERIAL_PALETTE.light[key] ?? 0xffffff),
        emissive: new THREE.Color(options.lightEmissive ?? MATERIAL_PALETTE.light[key] ?? 0x000000),
        emissiveIntensity: options.lightIntensity ?? 0,
        roughness: options.lightRoughness,
        metalness: options.lightMetalness,
        opacity: options.lightOpacity,
      },
      dark: {
        color: new THREE.Color(options.darkColor ?? MATERIAL_PALETTE.dark[key] ?? 0xffffff),
        emissive: new THREE.Color(options.darkEmissive ?? MATERIAL_PALETTE.dark[key] ?? 0x000000),
        emissiveIntensity: options.darkIntensity ?? 0,
        roughness: options.darkRoughness,
        metalness: options.darkMetalness,
        opacity: options.darkOpacity,
      },
    };
    this.profiles.push(profile);
    this.applyProfile(profile, this.theme, 1);
    return material;
  }

  applyProfile(profile, theme, amount) {
    const target = profile[theme];
    const material = profile.material;
    if (material.color && target.color) material.color.lerp(target.color, amount);
    if (material.emissive && target.emissive) material.emissive.lerp(target.emissive, amount);
    if (material.emissiveIntensity !== undefined && target.emissiveIntensity !== undefined) {
      material.emissiveIntensity = lerp(material.emissiveIntensity, target.emissiveIntensity, amount);
    }
    if (material.roughness !== undefined && target.roughness !== undefined) material.roughness = lerp(material.roughness, target.roughness, amount);
    if (material.metalness !== undefined && target.metalness !== undefined) material.metalness = lerp(material.metalness, target.metalness, amount);
    if (material.opacity !== undefined && target.opacity !== undefined) material.opacity = lerp(material.opacity, target.opacity, amount);
  }

  setTheme(theme) {
    this.targetTheme = theme === 'dark' ? 'dark' : 'light';
  }

  update(dt) {
    const amount = 1 - Math.exp(-dt * 5.5);
    this.profiles.forEach((profile) => this.applyProfile(profile, this.targetTheme, amount));
    const palette = MATERIAL_PALETTE[this.targetTheme];
    this.targetFloorColor.set(palette.floor);
    this.sceneBackground.lerp(this.targetFloorColor, amount);
    this.sceneFog.lerp(this.targetFloorColor, amount);
    if (this.scene.background && this.scene.background.isColor) this.scene.background.copy(this.sceneBackground);
    if (this.scene.fog) this.scene.fog.color.copy(this.sceneFog);
    this.robot.environmentObjects.forEach((object) => {
      if (object.color && object.userData.themeLightColor && object.userData.themeDarkColor) {
        this.scratchColor.set(this.targetTheme === 'dark' ? object.userData.themeDarkColor : object.userData.themeLightColor);
        object.color.lerp(this.scratchColor, amount);
      }
    });
    this.robot.lightProfiles.forEach((profile) => {
      const target = profile[this.targetTheme];
      this.scratchColor.set(target.color);
      profile.source.color.lerp(this.scratchColor, amount);
      profile.source.intensity = lerp(profile.source.intensity, target.intensity, amount);
      if (profile.ground && target.ground !== undefined) {
        this.scratchColor.set(target.ground);
        profile.ground.lerp(this.scratchColor, amount);
      }
    });
    if (this.targetTheme === this.theme) return;
    if (Math.abs(this.sceneBackground.r - this.targetFloorColor.r) < 0.002) this.theme = this.targetTheme;
  }
}

class ExpressionController {
  constructor(robot) {
    this.robot = robot;
    this.name = 'default';
    this.current = cloneExpression(EXPRESSIONS.default);
    this.target = cloneExpression(EXPRESSIONS.default);
    this.transition = 1;
    this.duration = 0.34;
  }

  setExpression(name) {
    const normalized = (name || 'default').toString().trim().toLowerCase();
    const key = EXPRESSION_ALIASES[normalized] || normalized;
    if (!EXPRESSIONS[key]) return false;
    this.name = key;
    this.target = cloneExpression(EXPRESSIONS[key]);
    this.transition = 0;
    return true;
  }

  update(dt) {
    this.transition = Math.min(1, this.transition + dt / this.duration);
    const amount = this.transition * this.transition * (3 - 2 * this.transition);
    this.current = blendExpression(this.current, this.target, amount);
    this.robot.applyFace(this.current);
  }
}

class AnimationController {
  constructor(robot) {
    this.robot = robot;
    this.name = 'idle';
    this.time = 0;
    this.transition = 1;
    this.duration = 0.42;
    this.fromPose = createPose();
    this.pose = createPose();
  }

  play(name) {
    const normalized = (name || 'idle').toString().trim().toLowerCase().replaceAll(' ', '-');
    const aliases = { neutral: 'idle', hover: 'idle', 'holding-card': 'card', 'holdingcard': 'card', 'pointing': 'point', 'celebrate': 'celebrating' };
    const key = aliases[normalized] || normalized;
    if (!['idle', 'wave', 'point', 'card', 'presenting', 'thinking', 'celebrating', 'working', 'success', 'error', 'loading', 'greeting'].includes(key)) return false;
    if (key === this.name && this.transition >= 1) {
      this.time = 0;
      return true;
    }
    this.fromPose = copyPose(this.pose);
    this.name = key;
    this.time = 0;
    this.transition = 0;
    return true;
  }

  update(dt, elapsed) {
    this.time += dt;
    this.transition = Math.min(1, this.transition + dt / this.duration);
    const targetPose = this.createActionPose(this.name, this.time, elapsed);
    const amount = this.transition * this.transition * (3 - 2 * this.transition);
    this.pose = blendPose(this.fromPose, targetPose, amount);
    this.robot.applyPose(this.pose, this.name);
  }

  createActionPose(name, time, elapsed) {
    const pose = createPose();
    const breath = Math.sin(elapsed * 1.65) * 0.012;
    const hover = Math.sin(elapsed * 1.18) * 0.035;
    pose.rootY = hover;
    pose.torsoScale = 1 + breath;
    pose.headYaw = Math.sin(elapsed * 0.7) * 0.018;
    pose.headRoll = Math.sin(elapsed * 0.53 + 0.7) * 0.012;
    pose.leftShoulderRoll += Math.sin(elapsed * 0.85) * 0.025;
    pose.rightShoulderRoll -= Math.sin(elapsed * 0.85 + 0.4) * 0.025;

    if (name === 'wave' || name === 'greeting') {
      const wave = Math.sin(time * 5.1);
      pose.rootY += Math.sin(time * 2.1) * 0.018;
      pose.headRoll = 0.07 + wave * 0.018;
      pose.rightShoulderPitch = -0.12;
      pose.rightShoulderRoll = 2.02 + wave * 0.16;
      pose.rightElbowRoll = -0.18;
      pose.rightWristRoll = wave * 0.22;
      applyHandPose(pose, 'right', 'open');
      pose.leftShoulderRoll = -0.18;
    } else if (name === 'point') {
      pose.rightShoulderPitch = -0.15;
      pose.rightShoulderRoll = 1.34;
      pose.rightElbowRoll = -0.12;
      pose.rightWristRoll = 0.1;
      applyHandPose(pose, 'right', 'point');
      pose.leftShoulderRoll = -0.2;
      pose.headYaw = -0.08;
    } else if (name === 'card') {
      pose.leftShoulderPitch = -0.95;
      pose.rightShoulderPitch = -0.95;
      pose.leftShoulderRoll = -0.24;
      pose.rightShoulderRoll = 0.24;
      pose.leftElbowPitch = -0.48;
      pose.rightElbowPitch = -0.48;
      pose.leftWristPitch = -0.16;
      pose.rightWristPitch = -0.16;
      applyHandPose(pose, 'left', 'present');
      applyHandPose(pose, 'right', 'present');
      pose.card = 1;
      pose.headPitch = 0.03;
    } else if (name === 'presenting') {
      pose.leftShoulderPitch = -0.28;
      pose.rightShoulderPitch = -0.28;
      pose.leftShoulderRoll = -0.72;
      pose.rightShoulderRoll = 0.72;
      pose.leftElbowRoll = -0.16;
      pose.rightElbowRoll = 0.16;
      applyHandPose(pose, 'left', 'present');
      applyHandPose(pose, 'right', 'present');
      pose.headPitch = -0.02;
    } else if (name === 'thinking') {
      pose.leftShoulderPitch = -0.52;
      pose.leftShoulderRoll = 1.15;
      pose.leftElbowPitch = -1.0;
      pose.leftElbowRoll = 0.75;
      pose.leftWristPitch = -0.22;
      applyHandPose(pose, 'left', 'pinch');
      pose.rightShoulderRoll = -0.18;
      pose.headRoll = -0.12;
      pose.headYaw = -0.11;
      pose.rootY += Math.sin(time * 1.5) * 0.012;
    } else if (name === 'celebrating') {
      const bounce = Math.abs(Math.sin(time * 4.1));
      pose.rootY += bounce * 0.12;
      pose.torsoScale = 1 + bounce * 0.018;
      pose.leftShoulderPitch = -0.12;
      pose.rightShoulderPitch = -0.12;
      pose.leftShoulderRoll = -2.12 - bounce * 0.08;
      pose.rightShoulderRoll = 2.12 + bounce * 0.08;
      pose.leftElbowRoll = -0.12;
      pose.rightElbowRoll = 0.12;
      applyHandPose(pose, 'left', 'open');
      applyHandPose(pose, 'right', 'open');
      pose.headLift = 0.035;
      pose.particles = 1;
    } else if (name === 'working') {
      pose.leftShoulderPitch = -0.62;
      pose.rightShoulderPitch = -0.62;
      pose.leftShoulderRoll = -0.24;
      pose.rightShoulderRoll = 0.24;
      pose.leftWristPitch = -0.55 + Math.sin(time * 8) * 0.09;
      pose.rightWristPitch = -0.55 + Math.sin(time * 8 + Math.PI) * 0.09;
      applyHandPose(pose, 'left', 'tap');
      applyHandPose(pose, 'right', 'tap');
      pose.headPitch = 0.11;
    } else if (name === 'success') {
      const beat = Math.max(0, Math.sin(time * 3.5));
      pose.rootY += beat * 0.045;
      pose.rightShoulderRoll = 1.1 + beat * 0.18;
      pose.rightShoulderPitch = -0.18;
      applyHandPose(pose, 'right', 'point');
      pose.headRoll = 0.08;
      pose.particles = beat * 0.6;
    } else if (name === 'error') {
      const shake = Math.sin(time * 7.5) * 0.045;
      pose.rootRoll = shake;
      pose.leftShoulderRoll = -0.42;
      pose.rightShoulderRoll = 0.42;
      pose.leftElbowPitch = -0.18;
      pose.rightElbowPitch = -0.18;
      applyHandPose(pose, 'left', 'pinch');
      applyHandPose(pose, 'right', 'pinch');
      pose.headRoll = shake * 0.7;
    } else if (name === 'loading') {
      pose.rootY = hover * 0.65;
      pose.leftShoulderRoll = -0.3 + Math.sin(time * 1.5) * 0.04;
      pose.rightShoulderRoll = 0.3 - Math.sin(time * 1.5) * 0.04;
      pose.leftWristPitch = Math.sin(time * 2.1) * 0.12;
      pose.rightWristPitch = -Math.sin(time * 2.1) * 0.12;
      applyHandPose(pose, 'left', 'pinch');
      applyHandPose(pose, 'right', 'pinch');
    }
    return pose;
  }
}

export class RobotMascot {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.options = options;
    this.root = new THREE.Group();
    this.root.name = 'CareerLensMascot';
    this.motionRoot = new THREE.Group();
    this.motionRoot.name = 'MotionRoot';
    this.root.add(this.motionRoot);
    this.allMaterials = new Set();
    this.lightProfiles = [];
    this.environmentObjects = [];
    this.debug = { wireframe: false, bounds: false, joints: false };
    this.clockTime = 0;
    this.gazeTarget = null;
    this.gaze = new THREE.Vector2();
    this.gazeGoal = new THREE.Vector2();
    this.blinkTimer = 2.6;
    this.blinkProgress = -1;
    this.blinkAmount = 0;
    this.themeController = new ThemeController(scene, this);
    this.materials = this.createMaterials();
    this.buildEnvironment();
    this.buildBody();
    this.buildHead();
    this.buildLimbs();
    this.buildCardAndParticles();
    this.buildDebugHelpers();
    this.expressionController = new ExpressionController(this);
    this.animationController = new AnimationController(this);
    this.faceMouthSignature = '';
    this.root.traverse((object) => {
      if (object.isMesh && object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => this.allMaterials.add(material));
      }
    });
    this.setExpression(options.expression || 'default');
    this.playAnimation(options.animation || 'idle');
    this.setTheme(options.theme || 'light', true);
  }

  createMaterials() {
    const makePhysical = (name, options = {}) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: MATERIAL_PALETTE.light[name] ?? 0xffffff,
        roughness: options.roughness ?? 0.28,
        metalness: options.metalness ?? 0.08,
        clearcoat: options.clearcoat ?? 0.58,
        clearcoatRoughness: options.clearcoatRoughness ?? 0.18,
        reflectivity: options.reflectivity ?? 0.6,
        sheen: options.sheen ?? 0.08,
        sheenRoughness: 0.3,
        ...options,
      });
      this.allMaterials.add(material);
      return this.themeController.register(material, name, options);
    };
    const makeStandard = (name, options = {}) => {
      const material = new THREE.MeshStandardMaterial({
        color: MATERIAL_PALETTE.light[name] ?? 0xffffff,
        roughness: options.roughness ?? 0.32,
        metalness: options.metalness ?? 0.05,
        ...options,
      });
      this.allMaterials.add(material);
      return this.themeController.register(material, name, options);
    };
    const makeBasic = (name, options = {}) => {
      const material = new THREE.MeshBasicMaterial({
        color: MATERIAL_PALETTE.light[name] ?? 0xffffff,
        ...options,
      });
      this.allMaterials.add(material);
      return this.themeController.register(material, name, options);
    };

    return {
      shell: makePhysical('shell', { lightRoughness: 0.34, darkRoughness: 0.32, lightMetalness: 0.06, darkMetalness: 0.24, lightColor: 0xeaf2f8, darkColor: 0x1c2732, clearcoat: 0.42, clearcoatRoughness: 0.24, reflectivity: 0.42, sheen: 0.04 }),
      shellSecondary: makePhysical('shellSecondary', { lightRoughness: 0.3, darkRoughness: 0.32, lightMetalness: 0.04, darkMetalness: 0.28, clearcoat: 0.6 }),
      shellShadow: makePhysical('shellShadow', { lightRoughness: 0.4, darkRoughness: 0.38, lightMetalness: 0.02, darkMetalness: 0.24, clearcoat: 0.4 }),
      shellEdge: makePhysical('shellEdge', { lightRoughness: 0.25, darkRoughness: 0.3, lightMetalness: 0.04, darkMetalness: 0.3, clearcoat: 0.68 }),
      accent: makeStandard('accent', { lightColor: 0x168cf2, darkColor: 0x8e1c08, lightEmissive: 0x0d5fbd, darkEmissive: 0xb52c0c, lightIntensity: 1.15, darkIntensity: 1.55, lightRoughness: 0.28, darkRoughness: 0.3 }),
      accentBright: makeStandard('accentBright', { lightEmissive: 0x1dafff, darkEmissive: 0xff3e12, lightIntensity: 2.1, darkIntensity: 2.6, lightRoughness: 0.2, darkRoughness: 0.24 }),
      accentSoft: makeStandard('accentSoft', { lightEmissive: 0x39caff, darkEmissive: 0xff6e2c, lightIntensity: 1.6, darkIntensity: 1.9, transparent: true, opacity: 0.72, lightOpacity: 0.72, darkOpacity: 0.7 }),
      eye: makeStandard('eye', { lightColor: 0x08798a, darkColor: 0x5a1608, lightEmissive: 0x00bfff, darkEmissive: 0xff3b0a, lightIntensity: 3.4, darkIntensity: 3.25, lightRoughness: 0.16, darkRoughness: 0.18, toneMapped: false }),
      visor: makePhysical('visor', { lightColor: 0x000000, darkColor: 0x000000, lightRoughness: 0.24, darkRoughness: 0.2, lightMetalness: 0.0, darkMetalness: 0.02, clearcoat: 0.28, clearcoatRoughness: 0.12, reflectivity: 0.1, specularIntensity: 0.35 }),
      visorEdge: makePhysical('visorEdge', { lightColor: 0x0a1624, darkColor: 0x11151c, lightRoughness: 0.2, darkRoughness: 0.17, lightMetalness: 0.6, darkMetalness: 0.65, clearcoat: 0.9 }),
      dark: makePhysical('dark', { lightColor: 0x101a28, darkColor: 0x090d13, lightRoughness: 0.3, darkRoughness: 0.25, lightMetalness: 0.42, darkMetalness: 0.58, clearcoat: 0.8 }),
      joint: makePhysical('joint', { lightColor: 0x172638, darkColor: 0x202a37, lightRoughness: 0.33, darkRoughness: 0.3, lightMetalness: 0.48, darkMetalness: 0.52, clearcoat: 0.75 }),
      halo: makeBasic('accentBright', { lightColor: 0x39cfff, darkColor: 0xff7a35, lightOpacity: 0.16, darkOpacity: 0.16, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }),
      faceHighlight: makeBasic('accentSoft', { lightColor: 0xa6edff, darkColor: 0xffc092, lightOpacity: 0.24, darkOpacity: 0.2, transparent: true, opacity: 0.24, depthWrite: false, blending: THREE.AdditiveBlending }),
      platform: makeBasic('floor', { lightColor: 0xbfe8ff, darkColor: 0x301714, lightOpacity: 0.42, darkOpacity: 0.5, transparent: true, opacity: 0.42, depthWrite: false }),
      platformRing: makeBasic('floorGlow', { lightColor: 0x5ed7ff, darkColor: 0xff5e2c, lightOpacity: 0.36, darkOpacity: 0.44, transparent: true, opacity: 0.36, depthWrite: false, blending: THREE.AdditiveBlending }),
      particle: makeBasic('accentBright', { lightColor: 0x65d9ff, darkColor: 0xff9a5a, lightOpacity: 0.7, darkOpacity: 0.74, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }),
    };
  }

  buildEnvironment() {
    if (!this.options.transparent) {
      this.scene.background = new THREE.Color(MATERIAL_PALETTE.light.floor);
      this.scene.fog = new THREE.Fog(MATERIAL_PALETTE.light.floor, 8, 17);
    }
    const hemi = new THREE.HemisphereLight(0xdff5ff, 0x93b7cf, 2.0);
    hemi.position.set(0, 7, 2);
    this.scene.add(hemi);
    this.lightProfiles.push({ source: hemi, light: { color: 0xdff5ff, intensity: 2.0 }, dark: { color: 0x9aaec2, intensity: 1.55, ground: 0x0b1017 }, ground: hemi.groundColor });

    const key = new THREE.DirectionalLight(0xffffff, 3.4);
    key.position.set(4.5, 7.5, 6.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 18;
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -2;
    key.shadow.bias = -0.00035;
    this.scene.add(key);
    this.lightProfiles.push({ source: key, light: { color: 0xffffff, intensity: 3.4 }, dark: { color: 0xe4edf6, intensity: 3.5 } });

    const fill = new THREE.DirectionalLight(0x8bdcff, 1.45);
    fill.position.set(-5, 4, 4);
    this.scene.add(fill);
    this.lightProfiles.push({ source: fill, light: { color: 0x8bdcff, intensity: 1.45 }, dark: { color: 0x7598bd, intensity: 1.7 } });

    const rim = new THREE.SpotLight(0x258dff, 5.2, 14, Math.PI * 0.27, 0.65, 1.4);
    rim.position.set(0, 6.5, -4.5);
    rim.target.position.set(0, 3.2, 0);
    this.scene.add(rim, rim.target);
    this.lightProfiles.push({ source: rim, light: { color: 0x258dff, intensity: 5.2 }, dark: { color: 0xff5426, intensity: 6.2 } });

    const warm = new THREE.PointLight(0x65d9ff, 0.35, 5.5, 2);
    warm.position.set(0, 2.2, 2.8);
    this.scene.add(warm);
    this.lightProfiles.push({ source: warm, light: { color: 0x65d9ff, intensity: 0.35 }, dark: { color: 0xff5b2b, intensity: 0.7 } });

    const showPlatform = this.options.showPlatform ?? true;
    const platform = new THREE.Mesh(new THREE.CircleGeometry(3.1, 96), this.materials.platform);
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = 0.015;
    platform.renderOrder = -2;
    platform.userData.themeLightColor = 0xbfe8ff;
    platform.userData.themeDarkColor = 0x301714;
    platform.visible = showPlatform;
    this.scene.add(platform);
    this.environmentObjects.push(platform);
    this.platform = platform;

    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.012, 8, 128), this.materials.platformRing);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.035;
    ring.renderOrder = -1;
    ring.visible = showPlatform;
    this.scene.add(ring);
    this.platformRing = ring;

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.35, 64),
      new THREE.ShadowMaterial({ color: 0x17324b, opacity: 0.18, transparent: true }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, 0.04, 0.04);
    shadow.scale.set(1, 0.62, 1);
    shadow.receiveShadow = true;
    shadow.visible = this.options.showShadow ?? true;
    this.scene.add(shadow);
    this.shadow = shadow;
  }

  makeMesh(geometry, material, name = '') {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  buildBody() {
    this.torso = new THREE.Group();
    this.torso.name = 'Body';
    this.torso.position.y = 2.18;
    this.motionRoot.add(this.torso);

    const bodyProfile = [
      [0.00, -0.86],
      [0.40, -0.86],
      [0.68, -0.76],
      [0.88, -0.54],
      [1.00, -0.18],
      [1.03, 0.22],
      [0.95, 0.56],
      [0.73, 0.78],
      [0.42, 0.88],
      [0.00, 0.88],
    ];
    this.torsoShell = this.makeMesh(latheProfileGeometry(bodyProfile, 56, 0.78), this.materials.shell, 'TorsoShell');
    this.torso.add(this.torsoShell);

    const waistRing = this.makeMesh(new THREE.TorusGeometry(0.66, 0.035, 10, 64), this.materials.accentSoft, 'WaistRing');
    waistRing.rotation.x = Math.PI / 2;
    waistRing.scale.z = 0.78;
    waistRing.position.y = -0.68;
    this.torso.add(waistRing);

    [-1, 1].forEach((side) => {
      const sidePanel = this.makeMesh(roundedPanelGeometry(0.3, 0.82, 0.075, 0.14), this.materials.accent, `SidePanel${side < 0 ? 'L' : 'R'}`);
      sidePanel.position.set(side * 0.77, 0.03, 0.11);
      sidePanel.rotation.y = side * 0.48;
      sidePanel.rotation.z = side * -0.045;
      this.torso.add(sidePanel);
      const sideInset = this.makeMesh(new THREE.CapsuleGeometry(0.035, 0.38, 6, 12), this.materials.accentBright, `SideInset${side < 0 ? 'L' : 'R'}`);
      sideInset.position.set(side * 0.93, 0.04, 0.19);
      sideInset.scale.set(0.75, 1, 0.6);
      this.torso.add(sideInset);
    });

    const lowerShell = this.makeMesh(superellipsoidGeometry(0.66, 0.22, 0.54, 32, 18, 0.7), this.materials.shellSecondary, 'LowerShell');
    lowerShell.position.y = -0.73;
    this.torso.add(lowerShell);

    const backSpine = this.makeMesh(new THREE.CapsuleGeometry(0.045, 0.9, 8, 12), this.materials.accent, 'BackSpine');
    backSpine.position.set(0, 0.03, -0.86);
    backSpine.scale.set(0.6, 1, 0.5);
    this.torso.add(backSpine);

    this.neck = new THREE.Group();
    this.neck.name = 'Neck';
    this.neck.position.y = 0.95;
    this.torso.add(this.neck);
    const neckCollar = this.makeMesh(new THREE.CylinderGeometry(0.31, 0.37, 0.14, 36), this.materials.joint, 'NeckCollar');
    neckCollar.scale.z = 0.82;
    this.neck.add(neckCollar);
    const neckGlow = this.makeMesh(new THREE.TorusGeometry(0.285, 0.014, 8, 48), this.materials.accent, 'NeckGlow');
    neckGlow.rotation.x = Math.PI / 2;
    neckGlow.position.y = 0.075;
    neckGlow.scale.z = 0.82;
    this.neck.add(neckGlow);

    this.createChestMark();
  }

  createChestMark() {
    const pointsC = [];
    const radius = 0.18;
    for (let i = 0; i <= 16; i += 1) {
      const angle = THREE.MathUtils.degToRad(60 + (240 * i) / 16);
      pointsC.push(new THREE.Vector3(Math.cos(angle) * radius - 0.16, Math.sin(angle) * radius + 0.03, 0.82));
    }
    const c = makeTube(pointsC, 0.032, this.materials.accentBright, 24, 8);
    c.name = 'ChestLogoC';
    this.torso.add(c);
    const l = makeTube([
      new THREE.Vector3(0.06, 0.22, 0.82),
      new THREE.Vector3(0.06, -0.16, 0.82),
      new THREE.Vector3(0.27, -0.16, 0.82),
    ], 0.032, this.materials.accentBright, 12, 8);
    l.name = 'ChestLogoL';
    this.torso.add(l);
    const logoDot = this.makeMesh(new THREE.SphereGeometry(0.028, 12, 8), this.materials.accentSoft, 'ChestLogoDot');
    logoDot.position.set(-0.16, 0.23, 0.83);
    this.torso.add(logoDot);
  }

  buildHead() {
    this.head = new THREE.Group();
    this.head.name = 'Head';
    this.head.position.set(0, 4.23, 0);
    this.motionRoot.add(this.head);

    this.headShell = this.makeMesh(new THREE.CapsuleGeometry(1.05, 0.62, 12, 48), this.materials.shell, 'HeadShell');
    this.headShell.scale.set(1.55, 0.92, 1.08);
    this.head.add(this.headShell);

    const rearInset = this.makeMesh(roundedPanelGeometry(0.64, 0.82, 0.035, 0.28), this.materials.shellSecondary, 'RearInset');
    rearInset.position.set(0, 0.02, -1.19);
    rearInset.rotation.y = Math.PI;
    this.head.add(rearInset);

    const rearSeam = this.makeMesh(new THREE.CapsuleGeometry(0.028, 0.7, 6, 10), this.materials.accentSoft, 'RearSeam');
    rearSeam.position.set(0, 0.1, -1.225);
    rearSeam.scale.set(0.7, 1, 0.5);
    this.head.add(rearSeam);

    const visorRim = this.makeMesh(curvedRoundedPanelGeometry(2.66, 1.36, 0.11, 0.62, 0.075), this.materials.visorEdge, 'VisorRim');
    visorRim.position.set(0, 0.02, 1.095);
    this.head.add(visorRim);
    const visor = this.makeMesh(curvedRoundedPanelGeometry(2.42, 1.14, 0.085, 0.56, 0.07), this.materials.visor, 'Visor');
    visor.position.set(0, 0.02, 1.16);
    this.head.add(visor);
    this.visor = visor;

    const visorGlint = this.makeMesh(new THREE.SphereGeometry(0.19, 24, 16), this.materials.faceHighlight, 'VisorGlint');
    visorGlint.scale.set(1.7, 0.18, 0.06);
    visorGlint.position.set(-0.57, 0.43, 1.225);
    visorGlint.rotation.z = -0.1;
    this.head.add(visorGlint);

    this.face = new THREE.Group();
    this.face.name = 'DynamicFace';
    this.face.position.z = 1.235;
    this.head.add(this.face);
    this.createEyes();
    this.createMouth();
    this.createEarModule(-1);
    this.createEarModule(1);
    this.createCrest();
  }

  createEyes() {
    this.eyes = {};
    ['left', 'right'].forEach((side) => {
      const sign = side === 'left' ? -1 : 1;
      const group = new THREE.Group();
      group.name = `Eye${side === 'left' ? 'Left' : 'Right'}`;
      group.position.set(sign * 0.58, 0.09, 0.01);
      this.face.add(group);
      const halo = this.makeMesh(new THREE.SphereGeometry(0.18, 20, 14), this.materials.halo, `EyeHalo${side}`);
      halo.scale.set(0.86, 1.18, 0.22);
      halo.renderOrder = 3;
      group.add(halo);
      const core = this.makeMesh(new THREE.CapsuleGeometry(0.125, 0.22, 8, 20), this.materials.eye, `EyeCore${side}`);
      core.scale.set(0.88, 1, 0.42);
      core.renderOrder = 4;
      group.add(core);
      const highlight = this.makeMesh(new THREE.SphereGeometry(0.032, 12, 8), this.materials.faceHighlight, `EyeHighlight${side}`);
      highlight.position.set(-0.035, 0.065, 0.1);
      highlight.scale.set(0.8, 1.2, 0.35);
      highlight.renderOrder = 5;
      group.add(highlight);
      const arc = makeTube([
        new THREE.Vector3(-0.1, -0.015, 0.08),
        new THREE.Vector3(0, 0.05, 0.085),
        new THREE.Vector3(0.1, -0.015, 0.08),
      ], 0.017, this.materials.eye, 12, 7);
      arc.name = `EyeArc${side}`;
      arc.visible = false;
      arc.renderOrder = 5;
      group.add(arc);
      this.eyes[side] = { group, halo, core, highlight, arc, baseX: sign * 0.58, baseY: 0.09 };
    });
  }

  createMouth() {
    this.mouth = new THREE.Group();
    this.mouth.name = 'DynamicMouth';
    this.mouth.position.set(0, 0, 0.015);
    this.face.add(this.mouth);
    this.mouthFill = this.makeMesh(new THREE.SphereGeometry(1, 28, 18), this.materials.visor, 'MouthFill');
    this.mouthFill.position.z = -0.015;
    this.mouthFill.scale.set(0.18, 0.06, 0.035);
    this.mouthFill.renderOrder = 1;
    this.mouth.add(this.mouthFill);
    this.mouthLine = makeTube([
      new THREE.Vector3(-0.18, 0, 0.03),
      new THREE.Vector3(0, -0.035, 0.035),
      new THREE.Vector3(0.18, 0, 0.03),
    ], 0.026, this.materials.eye, 18, 8);
    this.mouthLine.name = 'MouthLine';
    this.mouthLine.renderOrder = 4;
    this.mouth.add(this.mouthLine);
  }

  createEarModule(side) {
    const ear = new THREE.Group();
    ear.name = `EarModule${side < 0 ? 'Left' : 'Right'}`;
    ear.position.set(side * 1.72, 0.03, 0.02);
    ear.scale.setScalar(0.8);
    this.head.add(ear);
    const connector = this.makeMesh(new THREE.CylinderGeometry(0.2, 0.24, 0.28, 24), this.materials.shellSecondary, 'EarConnector');
    connector.rotation.z = Math.PI / 2;
    connector.position.x = -side * 0.18;
    ear.add(connector);
    const housing = this.makeMesh(new THREE.CylinderGeometry(0.47, 0.51, 0.3, 40), this.materials.shellSecondary, 'EarHousing');
    housing.rotation.z = Math.PI / 2;
    housing.scale.z = 0.92;
    ear.add(housing);
    const housingEdge = this.makeMesh(new THREE.TorusGeometry(0.4, 0.065, 12, 48), this.materials.accent, 'EarHousingEdge');
    housingEdge.rotation.y = Math.PI / 2;
    housingEdge.position.x = side * 0.17;
    ear.add(housingEdge);
    const inner = this.makeMesh(new THREE.CylinderGeometry(0.31, 0.31, 0.055, 36), this.materials.dark, 'EarInner');
    inner.rotation.z = Math.PI / 2;
    inner.position.x = side * 0.17;
    ear.add(inner);
    const ring = this.makeMesh(new THREE.TorusGeometry(0.255, 0.035, 10, 48), this.materials.accentBright, 'EarLightRing');
    ring.rotation.y = Math.PI / 2;
    ring.position.x = side * 0.205;
    ear.add(ring);
    const center = this.makeMesh(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 28), this.materials.eye, 'EarCenter');
    center.rotation.z = Math.PI / 2;
    center.position.x = side * 0.22;
    center.scale.set(0.7, 0.7, 0.7);
    ear.add(center);
    const earLight = new THREE.PointLight(MATERIAL_PALETTE.light.accentBright, 0, 1.5, 2);
    earLight.position.x = side * 0.25;
    ear.add(earLight);
    ear.userData.glowLight = earLight;
    this.environmentObjects.push(earLight);
    if (side < 0) this.leftEar = ear; else this.rightEar = ear;
  }

  createCrest() {
    this.crest = new THREE.Group();
    this.crest.name = 'HeadCrest';
    this.crest.position.set(0, 1.22, -0.06);
    this.crest.rotation.x = -0.16;
    this.crest.rotation.z = -0.055;
    this.head.add(this.crest);
    const fin = this.makeMesh(makeFinGeometry(), this.materials.shellSecondary, 'CrestShell');
    this.crest.add(fin);
    const finInset = this.makeMesh(roundedPanelGeometry(0.115, 0.5, 0.04, 0.045), this.materials.accent, 'CrestInset');
    finInset.position.set(0.015, 0.32, 0.155);
    finInset.rotation.z = -0.07;
    this.crest.add(finInset);
    const crestLight = new THREE.PointLight(MATERIAL_PALETTE.light.accentBright, 0, 1.4, 2);
    crestLight.position.set(0, 0.48, 0.15);
    this.crest.add(crestLight);
    this.environmentObjects.push(crestLight);
  }

  buildLimbs() {
    this.leftArm = this.createArm(-1, 'left');
    this.rightArm = this.createArm(1, 'right');
    this.leftLeg = this.createLeg(-1, 'left');
    this.rightLeg = this.createLeg(1, 'right');
  }

  createArm(side, name) {
    const sign = side < 0 ? -1 : 1;
    const root = new THREE.Group();
    root.name = `${name}Arm`;
    root.position.set(sign * 0.98, 2.62, 0.0);
    this.motionRoot.add(root);
    const shoulder = this.makeMesh(superellipsoidGeometry(0.26, 0.22, 0.25, 32, 20, 0.78), this.materials.shellSecondary, `${name}Shoulder`);
    root.add(shoulder);
    const upper = this.makeMesh(new THREE.CapsuleGeometry(0.205, 0.43, 8, 24), this.materials.shell, `${name}UpperArm`);
    upper.position.y = -0.38;
    root.add(upper);
    const upperAccent = this.makeMesh(new THREE.CapsuleGeometry(0.047, 0.27, 6, 12), this.materials.accent, `${name}UpperAccent`);
    upperAccent.position.set(sign * 0.12, -0.37, 0.17);
    upperAccent.scale.set(0.72, 1, 0.56);
    root.add(upperAccent);
    const elbow = new THREE.Group();
    elbow.name = `${name}Elbow`;
    elbow.position.y = -0.72;
    root.add(elbow);
    const elbowJoint = this.makeMesh(new THREE.SphereGeometry(0.19, 24, 16), this.materials.joint, `${name}ElbowJoint`);
    elbowJoint.scale.set(0.9, 0.78, 0.86);
    elbow.add(elbowJoint);
    const elbowRing = this.makeMesh(new THREE.TorusGeometry(0.16, 0.026, 8, 32), this.materials.accentSoft, `${name}ElbowRing`);
    elbowRing.rotation.x = Math.PI / 2;
    elbow.add(elbowRing);
    const forearm = this.makeMesh(new THREE.CapsuleGeometry(0.18, 0.4, 8, 24), this.materials.shell, `${name}Forearm`);
    forearm.position.y = -0.34;
    elbow.add(forearm);
    const forearmAccent = this.makeMesh(new THREE.CapsuleGeometry(0.04, 0.23, 6, 12), this.materials.accentBright, `${name}ForearmAccent`);
    forearmAccent.position.set(sign * 0.1, -0.34, 0.145);
    forearmAccent.scale.set(0.7, 1, 0.55);
    elbow.add(forearmAccent);
    const wrist = new THREE.Group();
    wrist.name = `${name}Wrist`;
    wrist.position.y = -0.68;
    elbow.add(wrist);
    const wristJoint = this.makeMesh(new THREE.SphereGeometry(0.12, 20, 12), this.materials.joint, `${name}WristJoint`);
    wristJoint.scale.set(0.9, 0.8, 0.8);
    wrist.add(wristJoint);
    const hand = this.createHand(side, name);
    wrist.add(hand);
    return { root, shoulder, upper, elbow, forearm, wrist, hand, side, sign };
  }

  createHand(side, name) {
    const hand = new THREE.Group();
    hand.name = `${name}Hand`;
    const palm = this.makeMesh(superellipsoidGeometry(0.23, 0.19, 0.145, 28, 18, 0.7), this.materials.shellSecondary, `${name}Palm`);
    palm.scale.set(1, 1, 0.8);
    hand.add(palm);
    const palmInset = this.makeMesh(new THREE.SphereGeometry(0.11, 16, 10), this.materials.accent, `${name}PalmInset`);
    palmInset.scale.set(0.75, 0.65, 0.25);
    palmInset.position.set(0, -0.015, 0.115);
    hand.add(palmInset);
    const fingers = [];
    const fingerNames = ['Index', 'Middle', 'Ring', 'Pinky'];
    for (let i = 0; i < 4; i += 1) {
      const finger = new THREE.Group();
      finger.name = `${name}${fingerNames[i]}`;
      finger.position.set((i - 1.5) * 0.075 * side, -0.16, 0);
      const fingerMaterial = i === 0 ? this.materials.accent : this.materials.shellSecondary;
      const mesh = this.makeMesh(new THREE.CapsuleGeometry(0.054, 0.18, 6, 12), fingerMaterial, `${name}Finger${i}`);
      mesh.position.y = -0.03;
      finger.add(mesh);
      const tip = this.makeMesh(new THREE.SphereGeometry(0.05, 12, 8), this.materials.accent, `${name}FingerTip${i}`);
      tip.position.y = -0.125;
      tip.scale.set(0.78, 0.5, 0.7);
      finger.add(tip);
      hand.add(finger);
      fingers.push(finger);
    }
    const thumb = new THREE.Group();
    thumb.name = `${name}Thumb`;
    thumb.position.set(side * 0.17, -0.015, 0.02);
    thumb.rotation.z = side * 0.62;
    const thumbMesh = this.makeMesh(new THREE.CapsuleGeometry(0.06, 0.16, 6, 12), this.materials.shellSecondary, `${name}ThumbMesh`);
    thumbMesh.position.y = -0.065;
    thumb.add(thumbMesh);
    hand.add(thumb);
    fingers.push(thumb);
    hand.userData.fingers = fingers;
    return hand;
  }

  createLeg(side, name) {
    const sign = side < 0 ? -1 : 1;
    const root = new THREE.Group();
    root.name = `${name}Leg`;
    root.position.set(side * 0.47, 1.38, 0.0);
    this.motionRoot.add(root);
    const thigh = this.makeMesh(new THREE.CapsuleGeometry(0.23, 0.27, 8, 24), this.materials.shell, `${name}Thigh`);
    thigh.position.y = -0.2;
    root.add(thigh);
    const knee = this.makeMesh(new THREE.SphereGeometry(0.2, 20, 14), this.materials.joint, `${name}Knee`);
    knee.position.y = -0.47;
    knee.scale.set(0.9, 0.75, 0.85);
    root.add(knee);
    const kneeRing = this.makeMesh(new THREE.TorusGeometry(0.16, 0.024, 8, 32), this.materials.accentSoft, `${name}KneeRing`);
    kneeRing.rotation.x = Math.PI / 2;
    kneeRing.position.y = -0.47;
    root.add(kneeRing);
    const shin = this.makeMesh(new THREE.CapsuleGeometry(0.185, 0.26, 8, 24), this.materials.shellSecondary, `${name}Shin`);
    shin.position.y = -0.65;
    root.add(shin);
    const ankle = this.makeMesh(new THREE.TorusGeometry(0.14, 0.028, 8, 32), this.materials.accent, `${name}Ankle`);
    ankle.rotation.x = Math.PI / 2;
    ankle.position.y = -0.88;
    root.add(ankle);
    const foot = this.makeMesh(superellipsoidGeometry(0.29, 0.16, 0.42, 32, 20, 0.64), this.materials.shell, `${name}Foot`);
    foot.position.set(0, -1.0, 0.12);
    foot.scale.set(0.92, 0.86, 1);
    root.add(foot);
    const toe = this.makeMesh(new THREE.SphereGeometry(0.2, 18, 12), this.materials.accentSoft, `${name}ToeGlow`);
    toe.scale.set(0.8, 0.22, 0.5);
    toe.position.set(0, -1.02, 0.42);
    root.add(toe);
    const sole = this.makeMesh(new THREE.CapsuleGeometry(0.12, 0.22, 6, 16), this.materials.shellShadow, `${name}Sole`);
    sole.rotation.x = Math.PI / 2;
    sole.scale.set(1.2, 0.34, 0.65);
    sole.position.set(0, -1.12, 0.16);
    root.add(sole);
    return { root, thigh, knee, shin, foot, ankle, side, sign };
  }

  buildCardAndParticles() {
    this.card = new THREE.Group();
    this.card.name = 'FloatingCard';
    this.card.position.set(0, 2.28, 0.86);
    this.card.visible = false;
    this.motionRoot.add(this.card);
    const cardBack = this.makeMesh(roundedPanelGeometry(1.35, 0.82, 0.065, 0.12), this.materials.visor, 'CardBack');
    this.card.add(cardBack);
    const cardFace = this.makeMesh(roundedPanelGeometry(1.24, 0.72, 0.025, 0.1), this.materials.shellSecondary, 'CardFace');
    cardFace.position.z = 0.048;
    this.card.add(cardFace);
    const cardBar = this.makeMesh(new THREE.BoxGeometry(0.7, 0.07, 0.018), this.materials.accentBright, 'CardBar');
    cardBar.position.set(-0.15, 0.19, 0.075);
    this.card.add(cardBar);
    const bars = [0.25, 0.42, 0.58, 0.72];
    bars.forEach((height, index) => {
      const bar = this.makeMesh(new THREE.BoxGeometry(0.12, height, 0.018), index === 3 ? this.materials.accentBright : this.materials.accentSoft, `CardBar${index}`);
      bar.position.set(-0.4 + index * 0.23, -0.24 + height * 0.5, 0.078);
      this.card.add(bar);
    });
    const scoreRing = this.makeMesh(new THREE.TorusGeometry(0.15, 0.025, 8, 32), this.materials.accentBright, 'CardScoreRing');
    scoreRing.position.set(0.37, -0.11, 0.08);
    this.card.add(scoreRing);
    const scoreCore = this.makeMesh(new THREE.SphereGeometry(0.075, 16, 10), this.materials.eye, 'CardScoreCore');
    scoreCore.position.copy(scoreRing.position);
    scoreCore.position.z += 0.01;
    this.card.add(scoreCore);

    this.particles = new THREE.Group();
    this.particles.name = 'CelebrationParticles';
    this.particles.visible = false;
    this.motionRoot.add(this.particles);
    this.particleData = [];
    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * TAU;
      const radius = 1.1 + (i % 3) * 0.18;
      const particle = this.makeMesh(new THREE.SphereGeometry(0.026 + (i % 2) * 0.012, 8, 6), this.materials.particle, `Particle${i}`);
      particle.position.set(Math.cos(angle) * radius, 3.2 + (i % 4) * 0.24, Math.sin(angle) * radius * 0.4 + 0.25);
      this.particles.add(particle);
      this.particleData.push({ particle, base: particle.position.clone(), phase: angle, speed: 0.7 + (i % 4) * 0.11 });
    }
  }

  buildDebugHelpers() {
    this.debugGroup = new THREE.Group();
    this.debugGroup.name = 'DebugHelpers';
    this.debugGroup.visible = false;
    this.scene.add(this.debugGroup);
    this.boundsHelper = new THREE.Box3Helper(new THREE.Box3(), 0x1b9cff);
    this.boundsHelper.material.transparent = true;
    this.boundsHelper.material.opacity = 0.5;
    this.debugGroup.add(this.boundsHelper);
    this.jointMarkers = [];
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x1b9cff, transparent: true, opacity: 0.78, depthTest: false });
    [
      this.leftArm.root,
      this.leftArm.elbow,
      this.leftArm.wrist,
      this.rightArm.root,
      this.rightArm.elbow,
      this.rightArm.wrist,
      this.leftLeg.root,
      this.leftLeg.knee,
      this.rightLeg.root,
      this.rightLeg.knee,
    ].forEach((object) => {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), markerMaterial);
      marker.renderOrder = 20;
      this.debugGroup.add(marker);
      this.jointMarkers.push({ object, marker });
    });
  }

  applyFace(expression) {
    if (!this.face) return;
    const gazeX = this.gaze.x;
    const gazeY = this.gaze.y;
    ['left', 'right'].forEach((side) => {
      const eye = this.eyes[side];
      const state = expression.eyes[side];
      const blinkScale = side === 'left' ? this.blinkAmount : this.blinkAmount;
      const scaleY = Math.max(0.035, state.scaleY * (1 - blinkScale));
      eye.group.position.x = eye.baseX + state.x + gazeX;
      eye.group.position.y = eye.baseY + state.y + gazeY;
      eye.group.rotation.z = state.rotation;
      eye.core.scale.set(state.scaleX, scaleY, 0.42);
      eye.halo.scale.set(0.86 * state.scaleX, 1.18 * scaleY, 0.22);
      eye.highlight.visible = scaleY > 0.16;
      eye.highlight.position.x = state.scaleX > 0.9 ? -0.035 : 0;
      eye.arc.visible = state.arc > 0.5 && blinkScale < 0.35;
      eye.arc.scale.set(state.scaleX, 1, 1);
    });

    const mouth = expression.mouth;
    const mouthOpen = clamp(mouth.open + this.blinkAmount * 0.01, 0, 0.4);
    this.mouthFill.visible = mouthOpen > 0.012;
    this.mouthFill.scale.set(mouth.width * 0.25, Math.max(0.04, mouthOpen), 0.035);
    this.mouthFill.position.set(0, mouth.centerY, -0.012);
    this.mouthLine.position.y = mouth.centerY;
    this.mouthLine.rotation.z = mouth.tilt;
    const signature = `${mouth.curve.toFixed(2)}:${mouth.width.toFixed(2)}:${mouth.centerY.toFixed(2)}:${mouth.tilt.toFixed(2)}`;
    if (signature !== this.faceMouthSignature) {
      this.faceMouthSignature = signature;
      const points = [];
      const half = mouth.width * 0.5;
      for (let i = 0; i <= 12; i += 1) {
        const normalized = -1 + (i / 12) * 2;
        const x = normalized * half;
        const y = -mouth.curve * 0.105 * (1 - normalized * normalized) * (0.72 + mouth.width * 0.25);
        points.push(new THREE.Vector3(x, y, 0.02));
      }
      const nextLine = makeTube(points, 0.024 + Math.max(0, mouthOpen) * 0.025, this.materials.eye, 20, 8);
      nextLine.name = 'MouthLine';
      nextLine.renderOrder = 4;
      this.mouth.remove(this.mouthLine);
      this.mouthLine.geometry.dispose();
      this.mouth.add(nextLine);
      this.mouthLine = nextLine;
    }
    const glow = expression.glow;
    this.materials.eye.emissiveIntensity = (this.themeController.targetTheme === 'dark' ? 3.25 : 3.4) * glow;
    this.materials.accentBright.emissiveIntensity = (this.themeController.targetTheme === 'dark' ? 2.6 : 2.1) * (0.92 + glow * 0.12);
  }

  applyPose(pose, actionName) {
    this.motionRoot.position.y = pose.rootY;
    this.motionRoot.rotation.x = pose.rootPitch;
    this.motionRoot.rotation.z = pose.rootRoll;
    this.torso.scale.set(1, pose.torsoScale, 1);
    this.neck.rotation.x = pose.neckPitch;
    const expression = this.expressionController?.current;
    const expressionHead = expression?.head || { pitch: 0, yaw: 0, roll: 0, lift: 0 };
    this.head.position.set(0, 4.23 + pose.headLift + expressionHead.lift, 0);
    this.head.rotation.set(pose.headPitch + expressionHead.pitch, pose.headYaw + expressionHead.yaw, pose.headRoll + expressionHead.roll);

    this.leftArm.root.rotation.set(pose.leftShoulderPitch, pose.leftShoulderYaw, pose.leftShoulderRoll);
    this.leftArm.elbow.rotation.set(pose.leftElbowPitch, pose.leftElbowYaw, pose.leftElbowRoll);
    this.leftArm.wrist.rotation.set(pose.leftWristPitch, pose.leftWristYaw, pose.leftWristRoll);
    this.rightArm.root.rotation.set(pose.rightShoulderPitch, pose.rightShoulderYaw, pose.rightShoulderRoll);
    this.rightArm.elbow.rotation.set(pose.rightElbowPitch, pose.rightElbowYaw, pose.rightElbowRoll);
    this.rightArm.wrist.rotation.set(pose.rightWristPitch, pose.rightWristYaw, pose.rightWristRoll);
    this.leftLeg.root.rotation.set(pose.leftLegPitch, 0, pose.leftLegRoll);
    this.rightLeg.root.rotation.set(pose.rightLegPitch, 0, pose.rightLegRoll);

    this.applyFingerPose(this.leftArm.hand.userData.fingers, pose.leftFingers);
    this.applyFingerPose(this.rightArm.hand.userData.fingers, pose.rightFingers);
    this.card.visible = pose.card > 0.008;
    this.card.scale.setScalar(0.76 + pose.card * 0.24);
    this.card.position.set(0, 2.28 + Math.sin(this.clockTime * 2.1) * 0.018, 0.72 + pose.card * 0.52);
    this.card.rotation.set(-0.08, Math.sin(this.clockTime * 1.1) * 0.035, Math.sin(this.clockTime * 1.5) * 0.018);
    this.particles.visible = pose.particles > 0.015;
  }

  applyFingerPose(fingers, states) {
    fingers.forEach((finger, index) => {
      const state = states[index] || [0, 0, 1];
      finger.rotation.set(state[0], 0, state[1]);
      finger.scale.set(1, Math.max(0.16, state[2]), 1);
    });
  }

  update(dt, elapsed = this.clockTime + dt) {
    const safeDt = clamp(dt, 0, 0.05);
    this.clockTime += safeDt;
    this.updateBlink(safeDt);
    this.updateGaze(safeDt);
    this.themeController.update(safeDt);
    this.expressionController.update(safeDt);
    this.animationController.update(safeDt, this.clockTime);
    this.updateAmbientMotion(safeDt, elapsed);
    this.updateDebug();
  }

  updateBlink(dt) {
    if (this.blinkProgress < 0) {
      this.blinkTimer -= dt;
      if (this.blinkTimer <= 0) {
        this.blinkProgress = 0;
        this.blinkTimer = 2.7 + Math.random() * 1.8;
      }
      this.blinkAmount = 0;
    } else {
      this.blinkProgress += dt / 0.18;
      if (this.blinkProgress >= 1) {
        this.blinkProgress = -1;
        this.blinkAmount = 0;
      } else {
        this.blinkAmount = Math.sin(this.blinkProgress * Math.PI);
      }
    }
  }

  updateGaze(dt) {
    if (this.gazeTarget) {
      this.gazeGoal.set(clamp(this.gazeTarget.x * 0.035, -0.12, 0.12), clamp((this.gazeTarget.y - 3.4) * 0.025, -0.1, 0.1));
    } else {
      this.gazeGoal.set(0, 0);
    }
    this.gaze.x = damp(this.gaze.x, this.gazeGoal.x, 5.5, dt);
    this.gaze.y = damp(this.gaze.y, this.gazeGoal.y, 5.5, dt);
  }

  updateAmbientMotion(dt, elapsed) {
    const expression = this.expressionController.current;
    const glow = expression.glow;
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * (this.animationController.name === 'thinking' ? 2.1 : 1.25));
    const earIntensity = 0;
    [this.leftEar, this.rightEar].forEach((ear, index) => {
      const light = ear.userData.glowLight;
      if (light) light.intensity = earIntensity * (index === 0 ? 1 : 0.92);
      ear.scale.setScalar(1 + pulse * 0.006);
    });
    this.crest.rotation.z = -0.055 + Math.sin(elapsed * 0.8) * 0.006;
    this.platformRing.scale.setScalar(1 + Math.sin(elapsed * 1.15) * 0.018);
    this.platformRing.material.opacity = this.themeController.targetTheme === 'dark' ? 0.4 : 0.32;
    this.card.rotation.y += dt * 0.18;
    if (this.particles.visible) {
      this.particleData.forEach(({ particle, base, phase, speed }, index) => {
        const wave = elapsed * speed + phase;
        particle.position.x = base.x + Math.sin(wave) * 0.09;
        particle.position.y = base.y + Math.sin(wave * 1.4 + index) * 0.11;
        particle.position.z = base.z + Math.cos(wave * 0.8) * 0.06;
        particle.scale.setScalar(0.75 + (Math.sin(wave * 2) + 1) * 0.2);
      });
    }
  }

  updateDebug() {
    if (!this.debugGroup.visible) return;
    this.root.updateWorldMatrix(true, true);
    this.boundsHelper.box.setFromObject(this.root);
    this.boundsHelper.updateMatrixWorld(true);
    this.jointMarkers.forEach(({ object, marker }) => {
      object.getWorldPosition(marker.position);
    });
  }

  setTheme(theme, immediate = false) {
    this.themeController.setTheme(theme);
    if (immediate) {
      this.themeController.update(10);
      this.themeController.theme = this.themeController.targetTheme;
      this.themeController.profiles.forEach((profile) => this.themeController.applyProfile(profile, this.themeController.targetTheme, 1));
    }
    return this;
  }

  setExpression(expression) {
    const changed = this.expressionController.setExpression(expression);
    return changed;
  }

  playAnimation(animation) {
    return this.animationController.play(animation);
  }

  setPose(pose) {
    return this.playAnimation(pose);
  }

  blink() {
    this.blinkProgress = 0;
    return this;
  }

  lookAt(x, y) {
    this.gazeTarget = new THREE.Vector2(Number(x) || 0, Number(y) || 0);
    return this;
  }

  clearLookAt() {
    this.gazeTarget = null;
    return this;
  }

  setDebugMode(mode, enabled) {
    if (mode === 'wireframe') {
      this.debug.wireframe = enabled;
      this.allMaterials.forEach((material) => { material.wireframe = enabled; });
    }
    if (mode === 'bounds') {
      this.debug.bounds = enabled;
      this.boundsHelper.visible = enabled;
      this.debugGroup.visible = this.debug.bounds || this.debug.joints;
    }
    if (mode === 'joints') {
      this.debug.joints = enabled;
      this.jointMarkers.forEach(({ marker }) => { marker.visible = enabled; });
      this.debugGroup.visible = this.debug.bounds || this.debug.joints;
    }
    return this;
  }

  reset() {
    this.gazeTarget = null;
    this.setExpression('default');
    this.playAnimation('idle');
    this.setTheme('light');
    return this;
  }

  getState() {
    return {
      theme: this.themeController.targetTheme,
      expression: this.expressionController.name,
      animation: this.animationController.name,
      blink: this.blinkAmount,
    };
  }

  get meshCount() {
    let count = 0;
    this.root.traverse((object) => { if (object.isMesh) count += 1; });
    return count;
  }

  dispose() {
    this.root.removeFromParent();
    this.debugGroup.removeFromParent();
    this.environmentObjects.forEach((object) => object.removeFromParent());
    disposeObject(this.root);
    disposeObject(this.debugGroup);
  }
}

export { EXPRESSIONS };
