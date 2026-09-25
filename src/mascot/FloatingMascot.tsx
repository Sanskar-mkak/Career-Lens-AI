import React from 'react';
import { Bot, Minimize2, X } from 'lucide-react';
import { useMascot } from './MascotContext';
import MascotCanvas from './MascotCanvas';
import styles from './FloatingMascot.module.css';

export const FloatingMascot: React.FC = () => {
  const {
    semanticState,
    activeMessage,
    floatingMascotVisible,
    setFloatingMascotVisible,
    floatingMascotMinimized,
    setFloatingMascotMinimized,
  } = useMascot();

  if (!floatingMascotVisible) return null;

  if (floatingMascotMinimized) {
    return (
      <div className={styles.floatingWrapper}>
        <button
          className={styles.minimizedBadge}
          onClick={() => setFloatingMascotMinimized(false)}
          title="Open Career Companion"
          aria-label="Open Career Companion"
        >
          <Bot size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.floatingWrapper}>
      <div className={styles.floatingCard} role="complementary" aria-label="Career Companion Widget">
        <div className={styles.headerBar}>
          <div className={styles.companionTitle}>
            <span className={styles.statusDot} />
            <span>Companion</span>
          </div>
          <div className={styles.controlButtons}>
            <button
              className={styles.iconBtn}
              onClick={() => setFloatingMascotMinimized(true)}
              title="Minimize Companion"
              aria-label="Minimize Companion"
            >
              <Minimize2 size={13} />
            </button>
            <button
              className={styles.iconBtn}
              onClick={() => setFloatingMascotVisible(false)}
              title="Dismiss Companion"
              aria-label="Dismiss Companion"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        <div className={styles.canvasBox}>
          <MascotCanvas
            semanticState={semanticState}
            cameraPreset="compact"
            showPlatform={false}
            interactive={true}
            enableMouseOrbit={true}
            showInteractiveHint={false}
          />
        </div>

        {activeMessage && (
          <div className={styles.bubbleArea}>
            <span>{activeMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMascot;
