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
import { SkinnedMeshes } from "./SkinnedMeshes";
import { AVATAR_MODEL_PATH, ANIMATIONS_MODEL_PATH } from "../constants/models";

export function Avatar(props) {
  const { nodes, materials, scene } = useGLTF(AVATAR_MODEL_PATH);
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