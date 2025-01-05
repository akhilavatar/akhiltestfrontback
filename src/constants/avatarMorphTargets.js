// Morph target mappings for different avatar types
export const AVATAR_MORPH_MAPPINGS = {
  rpm: {
    default: {},
    smile: {
      viseme_CH: 0.5,
      browInnerUp: 0.3,
      mouthSmile: 1.0
    },
    sad: {
      browInnerUp: 0.5,
      mouthFrown: 1.0,
      mouthLowerDown: 0.4,
      mouthShrugLower: 0.78,
      eyeSquintLeft: 0.72,
      eyeSquintRight: 0.75
    },
    angry: {
      browDownLeft: 1.0,
      browDownRight: 1.0,
      browDown_L: 0.8,
      browDown_R: 0.8,
      mouthFrown: 0.6,
      jawForward: 0.4,
      noseSneerLeft: 1.0,
      noseSneerRight: 0.42
    },
    surprised: {
      browInnerUp: 0.6,
      eyeWideLeft: 0.7,
      eyeWideRight: 0.7,
      jawOpen: 0.4,
      mouthFunnel: 1.0
    },
    crazy: {
      browInnerUp: 0.9,
      jawForward: 1.0,
      noseSneerLeft: 0.57,
      noseSneerRight: 0.51,
      eyeLookDownLeft: 0.39,
      eyeLookUpRight: 0.40,
      jawOpen: 0.96,
      mouthStretchLeft: 0.28,
      mouthStretchRight: 0.29,
      tongueOut: 0.96
    }
  },
  readyPlayerMe: {
    default: {},
    smile: {
      mouthSmile: 1.0,
      cheekSquint_L: 0.4,
      cheekSquint_R: 0.4,
      mouthSmileLeft: 1.0,
      mouthSmileRight: 1.0
    },
    sad: {
      browInnerUp: 0.4,
      mouthFrown: 0.8,
      mouthShrugLower: 0.78,
      eyeSquintLeft: 0.72,
      eyeSquintRight: 0.75
    },
    angry: {
      browDownLeft: 0.8,
      browDownRight: 0.8,
      noseSneer: 0.4,
      mouthFrown: 0.6,
      jawForward: 0.4
    },
    surprised: {
      browInnerUp: 0.6,
      eyeWide_L: 0.6,
      eyeWide_R: 0.6,
      jawOpen: 0.4,
      mouthOpen: 0.6
    },
    crazy: {
      browInnerUp: 0.9,
      jawOpen: 0.96,
      mouthStretchLeft: 0.28,
      mouthStretchRight: 0.29,
      tongueOut: 0.96
    }
  },
  // Common morphs that work across most avatars
  common: {
    default: {},
    smile: {
      mouthSmile: 1.0,
      mouthSmileLeft: 0.8,
      mouthSmileRight: 0.8
    },
    sad: {
      mouthFrown: 1.0,
      mouthFrownLeft: 0.8,
      mouthFrownRight: 0.8,
      browInnerUp: 0.5
    },
    angry: {
      browDown: 1.0,
      browDownLeft: 0.8,
      browDownRight: 0.8,
      mouthFrown: 0.6
    },
    surprised: {
      browUp: 0.8,
      browInnerUp: 0.6,
      jawOpen: 0.4,
      mouthOpen: 0.6
    },
    crazy: {
      browInnerUp: 0.9,
      jawOpen: 0.96,
      mouthOpen: 0.8,
      tongueOut: 0.96
    }
  }
};