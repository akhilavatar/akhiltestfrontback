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

  useEffect(() => {
    if (!actions || !currentAnimation) return;

    // Fade out current animation and fade in new one
    const action = actions[currentAnimation];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    }
  }, [currentAnimation, actions]);

  return {
    currentAnimation,
    setCurrentAnimation
  };
};