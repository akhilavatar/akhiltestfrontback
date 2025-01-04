import { useState, useEffect } from 'react';
import { ANIMATIONS } from '../constants/animations';

export const useAvatarAnimations = (actions, message) => {
  const [currentAnimation, setCurrentAnimation] = useState(ANIMATIONS.IDLE);

  useEffect(() => {
    if (!message) {
      setCurrentAnimation(ANIMATIONS.IDLE);
      return;
    }
    
    // Pick a random talking animation if none specified
    const talkingAnimation = message.animation || 
      ANIMATIONS.TALKING[Math.floor(Math.random() * ANIMATIONS.TALKING.length)];
    setCurrentAnimation(talkingAnimation);
  }, [message]);

  return {
    currentAnimation,
    setCurrentAnimation
  };
};