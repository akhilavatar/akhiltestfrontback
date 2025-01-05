import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef, useEffect, useMemo } from "react";
import { useLipSync } from "../../hooks/useLipSync";
import { useAvatarModel } from "../../hooks/useAvatarModel";
import { useAvatarState } from '../../hooks/useAvatarState';
import { useAvatarControls } from '../../hooks/useAvatarControls';
import { filterEndTracks } from '../../utils/animations';
import { retargetAnimation } from '../../utils/animations/retargeting';
import { AvatarMesh } from './AvatarMesh';

export function Avatar(props) {
  const { currentModel } = useAvatarModel();
  const avatarData = useGLTF(currentModel);
  const animationsData = useGLTF('/models/animations.glb');
  const group = useRef();

  // Ensure we have all required data
  const { nodes, materials, skeleton } = avatarData || {};
  const originalAnimations = animationsData?.animations || [];
  
  // Process animations only when we have valid data
  const animations = useMemo(() => {
    if (!originalAnimations?.length || !skeleton) return [];
    
    const filteredAnimations = filterEndTracks(originalAnimations);
    return filteredAnimations
      .map(clip => retargetAnimation(clip, skeleton))
      .filter(Boolean); // Remove any null results
  }, [originalAnimations, skeleton]);

  const { actions } = useAnimations(animations, group);
  const { currentViseme } = useLipSync();
  const { 
    currentAnimation, 
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression 
  } = useAvatarState();

  // Only setup controls if we have valid nodes
  useAvatarControls({
    nodes,
    onAnimationChange: (value) => {
      if (value && actions?.[value]) {
        setCurrentAnimation(value);
      }
    },
    onExpressionChange: setCurrentExpression
  });

  // Handle animation changes
  useEffect(() => {
    if (!actions || !currentAnimation || !actions[currentAnimation]) return;

    const action = actions[currentAnimation];
    
    // Fade out other animations
    Object.values(actions).forEach(a => {
      if (a !== action && a.isRunning()) {
        a.fadeOut(0.5);
      }
    });

    // Play new animation
    action.reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.5)
      .play();

    return () => action.fadeOut(0.5);
  }, [currentAnimation, actions]);

  // Don't render until we have all required data
  if (!nodes || !materials || !animations.length) {
    return null;
  }

  return (
    <group {...props} ref={group} dispose={null}>
      <AvatarMesh 
        nodes={nodes} 
        materials={materials} 
        currentExpression={currentExpression}
        currentViseme={currentViseme}
      />
    </group>
  );
}

// Preload assets
useGLTF.preload('/models/animations.glb');
[
  '/models/avatar1.glb',
  '/models/avatar2.glb',
  '/models/avatar3.glb',
  '/models/avatar4.glb',
  '/models/64f1a714fe61576b46f27ca2.glb'
].forEach(path => useGLTF.preload(path));