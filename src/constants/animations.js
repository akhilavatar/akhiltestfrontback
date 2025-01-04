// Animation categories
export const ANIMATION_CATEGORIES = {
  IDLE: 'Idle',
  TALKING: 'Talking',
  EMOTIONS: 'Emotions',
  ACTIONS: 'Actions'
};

// Individual animations
export const ANIMATIONS = {
  IDLE: 'Standing Idle',
  TALKING: ['Talking_0', 'Talking_1', 'Talking_2'],
  EMOTIONS: {
    ANGRY: 'Angry',
    CRYING: 'Crying',
    LAUGHING: 'Laughing',
    TERRIFIED: 'Terrified'
  },
  ACTIONS: {
    DANCING: 'Rumba Dancing'
  }
};

// Create a flat list of unique animations for the controls
export const ANIMATION_LIST = [
  ANIMATIONS.IDLE,
  ...ANIMATIONS.TALKING,
  ANIMATIONS.EMOTIONS.ANGRY,
  ANIMATIONS.EMOTIONS.CRYING,
  ANIMATIONS.EMOTIONS.LAUGHING,
  ANIMATIONS.EMOTIONS.TERRIFIED,
  ANIMATIONS.ACTIONS.DANCING
];