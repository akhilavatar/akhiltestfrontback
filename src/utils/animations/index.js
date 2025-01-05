import { processAnimationClip } from './clipProcessor';

export const filterEndTracks = (animations) => {
  if (!animations) return [];
  return animations.map(processAnimationClip).filter(Boolean);
};