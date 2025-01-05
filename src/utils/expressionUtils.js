import { BASE_EXPRESSIONS } from '../constants/expressionMappings';
import { createMorphMapping } from './expressionMapping';
import { logAvailableMorphTargets } from './debug/morphTargetLogger';

export const getExpressionMorphs = (nodes, expression = 'default') => {
  if (!nodes?.Wolf3D_Head?.morphTargetDictionary) return {};
  
  // Log available morphs in development
  if (process.env.NODE_ENV === 'development') {
    logAvailableMorphTargets(nodes);
  }
  
  const morphDict = nodes.Wolf3D_Head.morphTargetDictionary;
  const baseExpression = BASE_EXPRESSIONS[expression] || BASE_EXPRESSIONS.default;
  
  return createMorphMapping(morphDict, baseExpression);
};

export const applyMorphTargets = (mesh, morphTargets) => {
  if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;

  // Reset all morph targets first
  mesh.morphTargetInfluences.fill(0);

  // Apply new morph targets
  Object.entries(morphTargets).forEach(([key, value]) => {
    const idx = mesh.morphTargetDictionary[key];
    if (typeof idx !== 'undefined') {
      mesh.morphTargetInfluences[idx] = value;
    }
  });
};