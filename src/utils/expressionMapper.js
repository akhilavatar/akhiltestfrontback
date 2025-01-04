import { EXPRESSIONS } from '../constants/expressions';

// Map generic expressions to specific avatar morph targets
export const mapExpression = (expression, morphTargets) => {
  if (!expression || !morphTargets || !EXPRESSIONS[expression]) {
    return {};
  }

  const baseExpression = EXPRESSIONS[expression];
  const mappedMorphs = {};

  // Try exact matches first
  Object.entries(baseExpression).forEach(([key, value]) => {
    if (morphTargets.includes(key)) {
      mappedMorphs[key] = value;
    }
  });

  // Try alternative mappings if exact matches weren't found
  if (Object.keys(mappedMorphs).length === 0) {
    // Map to RPM style morphs
    if (morphTargets.includes('viseme_CH')) {
      switch (expression) {
        case 'smile':
          mappedMorphs['viseme_CH'] = 0.5;
          break;
        case 'angry':
          mappedMorphs['viseme_kk'] = 0.7;
          break;
        // Add more mappings as needed
      }
    }
    
    // Map to Ready Player Me style morphs
    else if (morphTargets.includes('mouthSmile')) {
      switch (expression) {
        case 'smile':
          mappedMorphs['mouthSmile'] = 1.0;
          break;
        case 'angry':
          mappedMorphs['browDown'] = 0.8;
          break;
        // Add more mappings as needed
      }
    }
  }

  return mappedMorphs;
};