import { MORPH_VARIANTS } from '../constants/morphTargetVariants';

// Find all available morph target variants and their values
export const findAvailableMorphs = (variant, morphDict, value) => {
  const variants = MORPH_VARIANTS[variant] || [variant];
  const matches = {};
  
  variants.forEach(v => {
    if (morphDict[v] !== undefined) {
      matches[v] = value;
    }
  });
  
  return matches;
};

// Create a mapping using all available morph targets
export const createMorphMapping = (morphDict, mappings) => {
  const result = {};
  
  Object.entries(mappings).forEach(([variant, value]) => {
    const morphs = findAvailableMorphs(variant, morphDict, value);
    Object.assign(result, morphs);
  });
  
  return result;
};