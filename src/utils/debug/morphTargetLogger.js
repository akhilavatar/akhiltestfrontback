// Utility for logging available morph targets
export const logAvailableMorphTargets = (nodes) => {
  if (!nodes?.Wolf3D_Head?.morphTargetDictionary) return;
  
  const morphDict = nodes.Wolf3D_Head.morphTargetDictionary;
  console.log('Available morph targets:', Object.keys(morphDict).sort());
};