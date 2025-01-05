// Utility to analyze available morph targets on an avatar
export const analyzeMorphTargets = (nodes) => {
  if (!nodes?.Wolf3D_Head?.morphTargetDictionary) return null;
  
  const morphDict = nodes.Wolf3D_Head.morphTargetDictionary;
  const morphKeys = Object.keys(morphDict);
  
  return {
    available: morphKeys,
    type: detectAvatarType(morphDict)
  };
};

// Detect avatar type based on available morph targets
const detectAvatarType = (morphDict) => {
  const morphKeys = Object.keys(morphDict);
  
  // RPM avatar type detection
  if (morphKeys.includes('viseme_PP')) return 'rpm';
  
  // Ready Player Me avatar type detection
  if (morphKeys.includes('mouthSmile') || morphKeys.includes('mouthSmileLeft')) return 'readyPlayerMe';
  
  // If no specific type detected, use common mappings
  return 'common';
};