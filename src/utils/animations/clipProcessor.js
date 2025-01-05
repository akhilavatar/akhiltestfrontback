import * as THREE from "three";
import { filterTracks } from './trackFilter';

export const processAnimationClip = (clip) => {
  if (!clip) return null;

  // Filter problematic tracks
  const filteredTracks = filterTracks(clip.tracks);
  
  // Create new clip with filtered tracks
  const newClip = new THREE.AnimationClip(
    clip.name,
    clip.duration,
    filteredTracks
  );
  
  // Configure looping
  newClip.loop = THREE.LoopRepeat;
  newClip.repetitions = Infinity;
  
  return newClip;
};