export type MascotSemanticState =
  | 'IDLE'
  | 'GREETING'
  | 'LOADING'
  | 'PROCESSING'
  | 'ANALYZING'
  | 'THINKING'
  | 'LISTENING'
  | 'FOCUSED'
  | 'CURIOUS'
  | 'SUCCESS'
  | 'EXCELLENT_RESULT'
  | 'GOOD_RESULT'
  | 'NEUTRAL_RESULT'
  | 'WEAK_RESULT'
  | 'ERROR'
  | 'WARNING'
  | 'CELEBRATING'
  | 'ENCOURAGING'
  | 'WORKING'
  | 'PRESENTING'
  | 'POINTING'
  | 'HELPING';

export type MascotExpression =
  | 'default'
  | 'happy'
  | 'wink'
  | 'thinking'
  | 'excited'
  | 'curious'
  | 'focused'
  | 'surprised'
  | 'sad'
  | 'confused'
  | 'determined'
  | 'laughing'
  | 'sleepy';

export type MascotAnimation =
  | 'idle'
  | 'wave'
  | 'point'
  | 'card'
  | 'presenting'
  | 'thinking'
  | 'celebrating'
  | 'working'
  | 'success'
  | 'error'
  | 'loading'
  | 'greeting';

export type MascotTheme = 'light' | 'dark';

export interface SemanticStateConfig {
  expression: MascotExpression;
  animation: MascotAnimation;
  defaultMessage?: string;
}

export const SEMANTIC_STATE_CONFIGS: Record<MascotSemanticState, SemanticStateConfig> = {
  IDLE: { expression: 'default', animation: 'idle', defaultMessage: 'Ready when you are!' },
  GREETING: { expression: 'happy', animation: 'greeting', defaultMessage: 'Welcome to CareerLens AI!' },
  LOADING: { expression: 'curious', animation: 'loading', defaultMessage: 'Loading resources...' },
  PROCESSING: { expression: 'thinking', animation: 'working', defaultMessage: 'Processing data...' },
  ANALYZING: { expression: 'focused', animation: 'thinking', defaultMessage: 'Analyzing thoroughly...' },
  THINKING: { expression: 'thinking', animation: 'thinking', defaultMessage: 'Evaluating patterns...' },
  LISTENING: { expression: 'curious', animation: 'idle', defaultMessage: "I'm listening closely..." },
  FOCUSED: { expression: 'focused', animation: 'working', defaultMessage: 'Focusing on the details...' },
  CURIOUS: { expression: 'curious', animation: 'point', defaultMessage: 'Notice this detail!' },
  SUCCESS: { expression: 'happy', animation: 'success', defaultMessage: 'Looking solid!' },
  EXCELLENT_RESULT: { expression: 'excited', animation: 'celebrating', defaultMessage: 'Outstanding performance!' },
  GOOD_RESULT: { expression: 'happy', animation: 'success', defaultMessage: 'Great progress!' },
  NEUTRAL_RESULT: { expression: 'default', animation: 'presenting', defaultMessage: 'Here are the findings.' },
  WEAK_RESULT: { expression: 'thinking', animation: 'thinking', defaultMessage: 'Clear areas for improvement.' },
  ERROR: { expression: 'confused', animation: 'error', defaultMessage: 'Something went wrong.' },
  WARNING: { expression: 'surprised', animation: 'point', defaultMessage: 'Review required here.' },
  CELEBRATING: { expression: 'excited', animation: 'celebrating', defaultMessage: 'Milestone reached!' },
  ENCOURAGING: { expression: 'happy', animation: 'presenting', defaultMessage: 'You’ve got this!' },
  WORKING: { expression: 'focused', animation: 'working', defaultMessage: 'Working on your career profile...' },
  PRESENTING: { expression: 'happy', animation: 'presenting', defaultMessage: 'Here is your breakdown.' },
  POINTING: { expression: 'focused', animation: 'point', defaultMessage: 'Check this section.' },
  HELPING: { expression: 'happy', animation: 'greeting', defaultMessage: 'Here to help you succeed.' },
};

export type CameraPreset = 'front' | 'three-quarter' | 'hero' | 'compact' | 'focus';

export interface CameraPresetConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const CAMERA_PRESETS: Record<CameraPreset, CameraPresetConfig> = {
  front: {
    position: [0, 3.85, 10.8],
    target: [0, 3.0, 0],
    fov: 35,
  },
  'three-quarter': {
    position: [7.4, 5.05, 9.8],
    target: [0, 3.0, 0],
    fov: 35,
  },
  hero: {
    position: [4.2, 4.3, 9.2],
    target: [0, 2.9, 0],
    fov: 34,
  },
  compact: {
    position: [2.5, 3.9, 9.6],
    target: [0, 3.0, 0],
    fov: 36,
  },
  focus: {
    position: [0, 3.7, 7.8],
    target: [0, 3.3, 0],
    fov: 32,
  },
};
