// Base expression configurations using standardized morph keys
export const BASE_EXPRESSIONS = {
  default: {},
  
  smile: {
    mouthSmile: 1.0,
    browInnerUp: 0.3,
    cheekSquint: 0.4,
    mouthSmileLeft: 0.8,
    mouthSmileRight: 0.8
  },
  
  sad: {
    browInnerUp: 0.5,
    mouthFrown: 1.0,
    eyeSquint: 0.7,
    mouthFrownLeft: 0.8,
    mouthFrownRight: 0.8
  },
  
  surprised: {
    browInnerUp: 0.8,
    eyeWide: 0.7,
    jawOpen: 0.6,
    mouthOpen: 0.6
  },
  
  angry: {
    browDown: 1.0,
    browDownLeft: 0.8,
    browDownRight: 0.8,
    eyeSquint: 0.7,
    mouthFrown: 0.6,
    noseSneer: 0.5,
    jawForward: 0.3
  },
  
  crazy: {
    browInnerUp: 0.9,
    jawOpen: 0.9,
    mouthStretch: 0.7,
    mouthStretchLeft: 0.7,
    mouthStretchRight: 0.7,
    tongueOut: 1.0
  }
};