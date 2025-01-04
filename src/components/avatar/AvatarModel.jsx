import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { AVATAR_LIST } from '../../constants/avatars';

export const AvatarModel = ({ children }) => {
  useEffect(() => {
    // Preload avatars
    AVATAR_LIST.forEach(avatar => useGLTF.preload(avatar.path));
    // Preload animations
    useGLTF.preload('/models/animations.glb');
  }, []);

  return children;
};