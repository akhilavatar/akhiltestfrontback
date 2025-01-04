import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useFacialExpressions } from "../hooks/useFacialExpressions";
import { useAudio } from "../hooks/useAudio";
import { useLipSync } from "../hooks/useLipSync";
import { filterEndTracks } from "../utils/animations";
import { useAvatarModel } from "../hooks/useAvatarModel";

export function Avatar(props) {
  const { currentModel } = useAvatarModel();
  const { nodes, materials, scene } = useGLTF(currentModel);
  const { animations: originalAnimations } = useGLTF("/models/animations.glb");
  const animations = filterEndTracks(originalAnimations);
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Standing Idle");
  const { message } = useChat();
  const [blink, setBlink] = useState(false);
  const blinkTimeout = useRef();
  
  const { currentExpression, setupMode, setupControls } = useFacialExpressions(nodes);
  const { currentViseme } = useLipSync();

  // ... rest of the Avatar component code remains the same ...

  return (
    <group {...props} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          {/* ... rest of the mesh components remain the same ... */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/animations.glb");
// Preload all avatar models
[
  '/models/avatar1.glb',
  '/models/avatar2.glb',
  '/models/avatar3.glb',
  '/models/avatar4.glb',
  '/models/64f1a714fe61576b46f27ca2.glb'
].forEach(path => useGLTF.preload(path));