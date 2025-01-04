import { AVATAR_MORPH_MAPPINGS } from '../constants/avatarMorphTargets';

export const getExpressionMorphs = (avatarType = 'default', expression = 'default') => {
  // Get mappings for avatar type, fallback to default if not found
  const mappings = AVATAR_MORPH_MAPPINGS[avatarType] || AVATAR_MORPH_MAPPINGS.default;
  return mappings[expression] || {};
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