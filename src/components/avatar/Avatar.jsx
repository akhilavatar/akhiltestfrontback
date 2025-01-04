import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { useLipSync } from "../../hooks/useLipSync";
import { useAvatarModel } from "../../hooks/useAvatarModel";
import { filterEndTracks } from "../../utils/animations";
import { ANIMATIONS } from "../../constants/animations";
import { AvatarMesh } from './AvatarMesh';
import { useAvatarState } from './useAvatarState';
import { useAvatarControls } from '../../hooks/useAvatarControls';

export function Avatar(props) {
  const { currentModel } = useAvatarModel();
  const { nodes, materials } = useGLTF(currentModel);
  const { animations: originalAnimations } = useGLTF("/models/animations.glb");
  const animations = filterEndTracks(originalAnimations);
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  const { message } = useChat();
  const { currentViseme } = useLipSync();
  const { 
    currentAnimation, 
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression 
  } = useAvatarState();

  // Setup Leva controls
  const { setupMode } = useAvatarControls({
    nodes,
    onAnimationChange: (value) => {
      if (value && actions[value]) {
        setCurrentAnimation(value);
      }
    },
    onExpressionChange: setCurrentExpression
  });

  // Handle animations
  useEffect(() => {
    if (!actions || !currentAnimation) return;
    
    const action = actions[currentAnimation];
    if (!action) return;

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

  // Handle message-based animations
  useEffect(() => {
    if (!message) {
      setCurrentAnimation(ANIMATIONS.IDLE);
      return;
    }

    const talkingAnimation = ANIMATIONS.TALKING[Math.floor(Math.random() * ANIMATIONS.TALKING.length)];
    setCurrentAnimation(talkingAnimation);
  }, [message, setCurrentAnimation]);

  return (
    <group {...props} ref={group} dispose={null}>
      <AvatarMesh 
        nodes={nodes} 
        materials={materials} 
        currentExpression={currentExpression}
        currentViseme={currentViseme}
        setupMode={setupMode}
      />
    </group>
  );
}

useGLTF.preload("/models/animations.glb");