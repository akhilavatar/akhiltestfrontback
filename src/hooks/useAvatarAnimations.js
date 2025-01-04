import { useState, useEffect } from 'react';
import { ANIMATIONS } from '../constants/animations';

export const useAvatarAnimations = (actions, message) => {
  const [currentAnimation, setCurrentAnimation] = useState(ANIMATIONS.IDLE);

  // Handle message-based animations
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

  // Handle animation transitions
  useEffect(() => {
    if (!actions || !currentAnimation) return;

    // Stop all current animations
    Object.values(actions).forEach(action => {
      if (action.isRunning()) {
        action.fadeOut(0.5);
      }
    });

    // Start new animation
    const action = actions[currentAnimation];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
    };
  }, [currentAnimation, actions]);

  return {
    currentAnimation,
    setCurrentAnimation
  };
};