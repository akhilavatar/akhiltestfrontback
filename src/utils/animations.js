import * as THREE from "three";

// Comprehensive list of track patterns to filter
const FILTERED_PATTERNS = [
  '_end.position',
  '_end.quaternion', 
  '_end.scale',
  'HeadTop_End',
  'LeftEye_end',
  'RightEye_end',
  'LeftHandThumb4_end',
  'RightHandThumb4_end'
];

export const filterEndTracks = (animations) => {
  if (!animations) return [];
  
  return animations.map(clip => {
    // Filter out problematic tracks
    const filteredTracks = clip.tracks.filter(track => 
      !FILTERED_PATTERNS.some(pattern => track.name.includes(pattern))
    );
    
    // Create new clip with filtered tracks
    const newClip = new THREE.AnimationClip(
      clip.name, 
      clip.duration, 
      filteredTracks
    );
    
    // Configure animation properties
    newClip.loop = THREE.LoopRepeat;
    newClip.repetitions = Infinity;
    
    return newClip;
  });
};