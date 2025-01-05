import * as THREE from "three";

// List of known problematic track patterns
const FILTERED_PATTERNS = [
  '_end.position',
  '_end.quaternion',
  '_end.scale',
  'HeadTop_End',
  'LeftEye_end',
  'RightEye_end',
  'LeftHandThumb4_end',
];

const shouldFilterTrack = (trackName) => {
  return FILTERED_PATTERNS.some(pattern => trackName.includes(pattern));
};

export const filterTracks = (tracks) => {
  return tracks.filter(track => !shouldFilterTrack(track.name));
};