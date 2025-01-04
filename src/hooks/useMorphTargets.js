import { useEffect, useState } from 'react';
import { mapExpression } from '../utils/expressionMapper';

export const useMorphTargets = (nodes, currentExpression) => {
  const [availableMorphs, setAvailableMorphs] = useState([]);
  const [mappedMorphs, setMappedMorphs] = useState({});

  // Analyze available morph targets
  useEffect(() => {
    if (!nodes?.Wolf3D_Head?.morphTargetDictionary) return;
    
    const morphs = Object.keys(nodes.Wolf3D_Head.morphTargetDictionary);
    setAvailableMorphs(morphs);
    console.log('Available morph targets:', morphs);
  }, [nodes]);

  // Map expression to available morph targets
  useEffect(() => {
    if (!availableMorphs.length || !currentExpression) return;
    
    const morphs = mapExpression(currentExpression, availableMorphs);
    setMappedMorphs(morphs);
  }, [availableMorphs, currentExpression]);

  return mappedMorphs;
};