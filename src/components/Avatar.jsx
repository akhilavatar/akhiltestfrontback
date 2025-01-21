import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useFacialExpressions } from "../hooks/useFacialExpressions";
import { useBlinking } from "../hooks/useBlinking";
import { useLipSync } from "../hooks/useLipSync";
import { filterEndTracks } from "../utils/animations";
import { applyMorphTarget } from "../utils/morphTargets";
import { AVATARS, ANIMATIONS_MODEL_PATH } from "../constants/models";
import { SkinnedMeshes1 } from "./SkinnedMeshes1";
import { SkinnedMeshes2 } from "./SkinnedMeshes2";
import { useAvatar } from "../hooks/useAvatar";
import { useAnimationControls } from "../hooks/useAnimationControls";
import * as THREE from 'three';

// Pre-load all models
useGLTF.preload(AVATARS.AVATAR_1.path);
useGLTF.preload(AVATARS.AVATAR_2.path);
useGLTF.preload(ANIMATIONS_MODEL_PATH);

export function Avatar(props) {
  const { selectedAvatarId } = useAvatar();
  const avatarPath = Object.values(AVATARS).find(avatar => avatar.id === selectedAvatarId)?.path;
  const group = useRef();
  
  // Load avatar model
  const { nodes, materials } = useGLTF(avatarPath);
  
  // Load and process animations
  const { animations: originalAnimations } = useGLTF(ANIMATIONS_MODEL_PATH);
  const animations = filterEndTracks(originalAnimations).map(clip => {
    // Create a new animation clip for each animation
    const tracks = clip.tracks.map(track => {
      // Update track names to match the current avatar's bone names
      const newTrack = track.clone();
      newTrack.name = track.name;
      return newTrack;
    });
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
  });

  // Setup animations
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Standing Idle");
  
  const { message, onMessagePlayed } = useChat();
  const { blink } = useBlinking();
  const { currentViseme } = useLipSync();
  const { currentExpression, setupMode, setupControls } = useFacialExpressions(nodes);

  // Add animation controls to Leva panel
  useAnimationControls(actions, animation, setAnimation);

  // Handle avatar change
  useEffect(() => {
    if (actions && animation) {
      // Stop all animations
      Object.values(actions).forEach(action => action?.stop());
      
      // Start the current animation
      const currentAction = actions[animation];
      if (currentAction) {
        currentAction.reset().fadeIn(0.5).play();
      }
    }
  }, [selectedAvatarId, actions, animation]);

  // Handle animation changes
  useEffect(() => {
    if (!actions || !animation) return;

    const currentAction = actions[animation];
    if (currentAction) {
      // Stop all other animations
      Object.values(actions).forEach(action => {
        if (action !== currentAction) {
          action.stop();
        }
      });

      // Play the new animation
      currentAction.reset().fadeIn(0.5).play();

      return () => {
        currentAction.fadeOut(0.5);
      };
    }
  }, [animation, actions]);

  // Handle message animations
  useEffect(() => {
    if (message) {
      setAnimation("Talking_0");
      const timeout = setTimeout(() => {
        setAnimation("Standing Idle");
        onMessagePlayed();
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message, onMessagePlayed]);

  useFrame(() => {
    if (setupMode && nodes?.Wolf3D_Head) {
      Object.entries(setupControls).forEach(([key, value]) => {
        applyMorphTarget(nodes.Wolf3D_Head, key, value);
      });
    }

    // Apply blinking
    if (nodes?.Wolf3D_Head) {
      applyMorphTarget(nodes.Wolf3D_Head, 'eyeBlinkLeft', blink ? 1 : 0);
      applyMorphTarget(nodes.Wolf3D_Head, 'eyeBlinkRight', blink ? 1 : 0);
    }

    // Apply lip sync
    if (currentViseme && nodes?.Wolf3D_Head) {
      // Reset previous visemes
      Object.keys(nodes.Wolf3D_Head.morphTargetDictionary || {})
        .filter(key => key.startsWith('viseme_'))
        .forEach(key => {
          applyMorphTarget(nodes.Wolf3D_Head, key, 0);
        });
      
      // Apply current viseme
      applyMorphTarget(nodes.Wolf3D_Head, currentViseme, 1);
    }
  });

  const SkinnedMeshes = selectedAvatarId === AVATARS.AVATAR_1.id ? SkinnedMeshes1 : SkinnedMeshes2;

  return (
    <group {...props} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <SkinnedMeshes nodes={nodes} materials={materials} />
        </group>
      </group>
    </group>
  );
}