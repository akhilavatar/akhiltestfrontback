import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { filterEndTracks } from '../utils/animations';

export const useAvatarAnimations = () => {
  const [animations, setAnimations] = useState(null);
  // Use the correct path with useGLTF
  const { animations: originalAnimations } = useGLTF('/models/animations.glb');

  useEffect(() => {
    if (!originalAnimations) return;
    const filteredAnimations = filterEndTracks(originalAnimations);
    setAnimations(filteredAnimations);
  }, [originalAnimations]);

  return animations;
};

// Preload animations
useGLTF.preload('/models/animations.glb');