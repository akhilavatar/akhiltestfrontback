import { useState } from 'react';
import { ANIMATIONS } from '../../constants/animations';

export const useAvatarState = () => {
  const [currentAnimation, setCurrentAnimation] = useState(ANIMATIONS.IDLE);
  const [currentExpression, setCurrentExpression] = useState('default');

  return {
    currentAnimation,
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression
  };
};