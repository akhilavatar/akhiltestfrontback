import * as THREE from "three";

// Common bone mappings for different avatar types
const BONE_MAPPINGS = {
  mixamo: {
    Hips: ['mixamorigHips', 'Hips'],
    Spine: ['mixamorigSpine', 'Spine'],
    Head: ['mixamorigHead', 'Head'],
    LeftArm: ['mixamorigLeftArm', 'LeftArm'],
    RightArm: ['mixamorigRightArm', 'RightArm'],
    LeftForeArm: ['mixamorigLeftForeArm', 'LeftForeArm'],
    RightForeArm: ['mixamorigRightForeArm', 'RightForeArm'],
    LeftUpLeg: ['mixamorigLeftUpLeg', 'LeftUpLeg'],
    RightUpLeg: ['mixamorigRightUpLeg', 'RightUpLeg'],
    LeftLeg: ['mixamorigLeftLeg', 'LeftLeg'],
    RightLeg: ['mixamorigRightLeg', 'RightLeg'],
  }
};

export const retargetAnimation = (clip, skeleton) => {
  if (!clip || !skeleton) return null;

  const tracks = [];
  
  clip.tracks.forEach(track => {
    // Extract bone name from track
    const trackSplits = track.name.split('.');
    const boneName = trackSplits[0];
    const property = trackSplits[1];

    // Find matching bone in skeleton
    const bone = skeleton.bones.find(b => 
      Object.values(BONE_MAPPINGS.mixamo)
        .flat()
        .some(name => b.name.includes(name))
    );

    if (bone) {
      // Create new track with correct bone name
      const newTrackName = `${bone.name}.${property}`;
      const newTrack = track.clone();
      newTrack.name = newTrackName;
      tracks.push(newTrack);
    }
  });

  return new THREE.AnimationClip(
    clip.name,
    clip.duration,
    tracks,
    clip.blendMode
  );
};