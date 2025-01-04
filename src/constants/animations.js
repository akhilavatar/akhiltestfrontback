// Animation categories
export const ANIMATION_CATEGORIES = {
  IDLE: 'Idle',
  TALKING: 'Talking',
  EMOTIONS: 'Emotions',
  ACTIONS: 'Actions'
};

// All available animations
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

// Animation groups for the Leva controls UI
export const ANIMATION_GROUPS = [
  {
    label: ANIMATION_CATEGORIES.IDLE,
    animations: [ANIMATIONS.IDLE]
  },
  {
    label: ANIMATION_CATEGORIES.TALKING,
    animations: ANIMATIONS.TALKING
  },
  {
    label: ANIMATION_CATEGORIES.EMOTIONS,
    animations: [
      ANIMATIONS.EMOTIONS.ANGRY,
      ANIMATIONS.EMOTIONS.CRYING,
      ANIMATIONS.EMOTIONS.LAUGHING,
      ANIMATIONS.EMOTIONS.TERRIFIED
    ]
  },
  {
    label: ANIMATION_CATEGORIES.ACTIONS,
    animations: [ANIMATIONS.ACTIONS.DANCING]
  }
];