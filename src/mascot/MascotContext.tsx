import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  MascotSemanticState,
  MascotExpression,
  MascotAnimation,
  SEMANTIC_STATE_CONFIGS,
} from './types';

interface MascotContextValue {
  semanticState: MascotSemanticState;
  expression: MascotExpression;
  animation: MascotAnimation;
  activeMessage: string | null;
  setSemanticState: (state: MascotSemanticState, customMessage?: string) => void;
  setActiveMessage: (message: string | null) => void;
  floatingMascotVisible: boolean;
  setFloatingMascotVisible: (visible: boolean) => void;
  floatingMascotMinimized: boolean;
  setFloatingMascotMinimized: (minimized: boolean) => void;
  toggleFloatingMascot: () => void;
}

const MascotContext = createContext<MascotContextValue | null>(null);

export interface MascotProviderProps {
  children: React.ReactNode;
  initialState?: MascotSemanticState;
  initialMessage?: string;
  defaultFloatingVisible?: boolean;
}

export const MascotProvider: React.FC<MascotProviderProps> = ({
  children,
  initialState = 'IDLE',
  initialMessage,
  defaultFloatingVisible = true,
}) => {
  const [semanticState, setSemanticStateInternal] = useState<MascotSemanticState>(initialState);
  const [activeMessage, setActiveMessage] = useState<string | null>(
    initialMessage ?? SEMANTIC_STATE_CONFIGS[initialState]?.defaultMessage ?? null
  );
  const [floatingMascotVisible, setFloatingMascotVisible] = useState<boolean>(defaultFloatingVisible);
  const [floatingMascotMinimized, setFloatingMascotMinimized] = useState<boolean>(false);

  const setSemanticState = useCallback((state: MascotSemanticState, customMessage?: string) => {
    setSemanticStateInternal(state);
    if (customMessage !== undefined) {
      setActiveMessage(customMessage);
    } else {
      setActiveMessage(SEMANTIC_STATE_CONFIGS[state]?.defaultMessage ?? null);
    }
  }, []);

  const toggleFloatingMascot = useCallback(() => {
    setFloatingMascotVisible((prev) => !prev);
  }, []);

  const currentConfig = SEMANTIC_STATE_CONFIGS[semanticState] || SEMANTIC_STATE_CONFIGS.IDLE;

  const value = useMemo<MascotContextValue>(
    () => ({
      semanticState,
      expression: currentConfig.expression,
      animation: currentConfig.animation,
      activeMessage,
      setSemanticState,
      setActiveMessage,
      floatingMascotVisible,
      setFloatingMascotVisible,
      floatingMascotMinimized,
      setFloatingMascotMinimized,
      toggleFloatingMascot,
    }),
    [
      semanticState,
      currentConfig.expression,
      currentConfig.animation,
      activeMessage,
      setSemanticState,
      floatingMascotVisible,
      floatingMascotMinimized,
      toggleFloatingMascot,
    ]
  );

  return <MascotContext.Provider value={value}>{children}</MascotContext.Provider>;
};

export function useMascot(): MascotContextValue {
  const context = useContext(MascotContext);
  if (!context) {
    // Return a graceful fallback if used outside MascotProvider
    const fallbackConfig = SEMANTIC_STATE_CONFIGS.IDLE;
    return {
      semanticState: 'IDLE',
      expression: fallbackConfig.expression,
      animation: fallbackConfig.animation,
      activeMessage: null,
      setSemanticState: () => {},
      setActiveMessage: () => {},
      floatingMascotVisible: false,
      setFloatingMascotVisible: () => {},
      floatingMascotMinimized: false,
      setFloatingMascotMinimized: () => {},
      toggleFloatingMascot: () => {},
    };
  }
  return context;
}
