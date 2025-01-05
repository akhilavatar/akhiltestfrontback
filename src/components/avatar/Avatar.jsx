import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import { useLipSync } from "../../hooks/useLipSync";
import { useAvatarModel } from "../../hooks/useAvatarModel";
import { useAvatarState } from '../../hooks/useAvatarState';
import { useAvatarControls } from '../../hooks/useAvatarControls';
import { useAvatarAnimations } from '../../hooks/useAvatarAnimations';
import { AvatarMesh } from './AvatarMesh';

export function Avatar(props) {
  const { currentModel } = useAvatarModel();
  const { nodes, materials } = useGLTF(currentModel);
  const animations = useAvatarAnimations();
  const group = useRef();
  const { actions } = useAnimations(animations || [], group);
  const { currentViseme } = useLipSync();
  const { 
    currentAnimation, 
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression 
  } = useAvatarState();

  // Setup Leva controls
  useAvatarControls({
    nodes,
    onAnimationChange: (value) => {
      if (value && actions?.[value]) {
        setCurrentAnimation(value);
      }
    },
    onExpressionChange: setCurrentExpression
  });

  // Handle animations
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
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [currentAnimation, actions]);

  if (!nodes || !materials || !animations) {
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