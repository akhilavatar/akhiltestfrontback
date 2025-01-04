import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
import React, { useRef, useState } from "react";
import { useChat } from "../../hooks/useChat";
import { useFacialExpressions } from "../../hooks/useFacialExpressions";
import { useLipSync } from "../../hooks/useLipSync";
import { useAvatarModel } from "../../hooks/useAvatarModel";
import { useAvatarAnimations } from "../../hooks/useAvatarAnimations";
import { filterEndTracks } from "../../utils/animations";
import { ANIMATION_GROUPS, ANIMATION_CATEGORIES } from "../../constants/animations";

export function Avatar(props) {
  // ... previous imports and initial setup ...

  // Animation controls with categories
  useControls({
    Animations: folder({
      Category: {
        value: ANIMATION_CATEGORIES.IDLE,
        options: Object.values(ANIMATION_CATEGORIES),
      },
      Animation: {
        value: currentAnimation,
        options: ANIMATION_GROUPS.reduce((acc, group) => ({
          ...acc,
          [group.label]: group.animations
        }), {}),
        onChange: (value) => {
          setCurrentAnimation(value);
        },
      },
    }),
  });

  // ... rest of the component remains the same ...
}