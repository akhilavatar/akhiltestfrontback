import { useEffect, useRef, useState } from 'react';
import { getExpressionMorphs, applyMorphTargets } from '../utils/expressionUtils';
import { analyzeMorphTargets } from '../utils/morphTargetAnalyzer';

export const useAvatarExpressions = (nodes, currentExpression) => {
  const meshRefs = useRef({});
  const [avatarType, setAvatarType] = useState('unknown');
  const [availableMorphs, setAvailableMorphs] = useState([]);

  // Analyze avatar type when nodes change
  useEffect(() => {
    if (!nodes) return;
    const analysis = analyzeMorphTargets(nodes);
    if (analysis) {
      setAvatarType(analysis.type);
      setAvailableMorphs(analysis.available);
      console.log('Avatar type detected:', analysis.type);
    }
  }, [nodes]);

  // Apply expressions based on avatar type
  useEffect(() => {
    if (!nodes || !currentExpression) return;

    const morphTargets = getExpressionMorphs(avatarType, currentExpression);
    
    // Apply to all facial meshes
    ['Wolf3D_Head', 'Wolf3D_Teeth', 'EyeLeft', 'EyeRight'].forEach(meshName => {
      const mesh = nodes[meshName];
      if (mesh?.morphTargetDictionary && mesh?.morphTargetInfluences) {
        // Reset morphs
        mesh.morphTargetInfluences.fill(0);
        
        // Apply new expression
        Object.entries(morphTargets).forEach(([key, value]) => {
          const idx = mesh.morphTargetDictionary[key];
          if (typeof idx !== 'undefined') {
            mesh.morphTargetInfluences[idx] = value;
          }
        });
      }
    });
  }, [nodes, currentExpression, avatarType, availableMorphs]);

  return meshRefs;
};