import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
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

// Pre-load both models
useGLTF.preload(AVATARS.AVATAR_1.path);
useGLTF.preload(AVATARS.AVATAR_2.path);

export function Avatar(props) {
  const { selectedAvatarId } = useAvatar();
  const avatarPath = Object.values(AVATARS).find(avatar => avatar.id === selectedAvatarId)?.path;
  
  const { nodes, materials } = useGLTF(avatarPath);
  const { animations: originalAnimations } = useGLTF(ANIMATIONS_MODEL_PATH);
  const animations = filterEndTracks(originalAnimations);
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Standing Idle");
  const { message, onMessagePlayed } = useChat();
  const { blink } = useBlinking();
  const { currentViseme } = useLipSync();
  
  const { currentExpression, setupMode, setupControls } = useFacialExpressions(nodes);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

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
  }, [message]);

  useControls({
    Animation: {
      value: animation,
      options: Object.keys(actions),
      onChange: (value) => {
        setAnimation(value);
      },
    },
  });

  useFrame(() => {
    if (setupMode && nodes?.Wolf3D_Head) {
      Object.entries(setupControls).forEach(([key, value]) => {
        applyMorphTarget(nodes.Wolf3D_Head, key, value);
      });
    }

    // Apply blinking
    if (nodes.Wolf3D_Head) {
      applyMorphTarget(nodes.Wolf3D_Head, 'eyeBlinkLeft', blink ? 1 : 0);
      applyMorphTarget(nodes.Wolf3D_Head, 'eyeBlinkRight', blink ? 1 : 0);
    }

    // Apply lip sync
    if (currentViseme && nodes.Wolf3D_Head) {
      // Reset previous visemes
      Object.keys(nodes.Wolf3D_Head.morphTargetDictionary)
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