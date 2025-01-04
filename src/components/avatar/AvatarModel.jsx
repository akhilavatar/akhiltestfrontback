import { useGLTF } from "@react-three/drei";
import { AVATAR_LIST } from '../../constants/avatars';

export const AvatarModel = ({ children }) => {
  // Preload all avatar models
  AVATAR_LIST.forEach(avatar => useGLTF.preload(avatar.path));
  useGLTF.preload("/models/animations.glb");

  return children;
};