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
      mouthLowerDown: 0.4
    },
    angry: {
      browDown_L: 0.8,
      browDown_R: 0.8,
      mouthFrown: 0.6,
      jawForward: 0.4
    },
    surprised: {
      browInnerUp: 0.6,
      eyeWide_L: 0.7,
      eyeWide_R: 0.7,
      jawOpen: 0.4
    }
  },
  readyPlayerMe: {
    default: {},
    smile: {
      mouthSmile: 1.0,
      cheekSquint_L: 0.4,
      cheekSquint_R: 0.4
    },
    sad: {
      browInnerUp: 0.4,
      mouthFrown: 0.8
    },
    angry: {
      browDownLeft: 0.8,
      browDownRight: 0.8,
      noseSneer: 0.4
    },
    surprised: {
      browInnerUp: 0.6,
      eyeWide_L: 0.6,
      eyeWide_R: 0.6,
      jawOpen: 0.4
    }
  },
  unknown: {
    default: {},
    smile: {
      mouthSmile: 0.8
    },
    sad: {
      mouthFrown: 0.8
    },
    angry: {
      browDown: 0.8
    },
    surprised: {
      eyeWide: 0.6,
      jawOpen: 0.4
    }
  }
};