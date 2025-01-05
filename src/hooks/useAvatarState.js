import { useState, useEffect } from 'react';
import { ANIMATIONS } from '../constants/animations';
import { useChat } from './useChat';

export const useAvatarState = () => {
  const [currentAnimation, setCurrentAnimation] = useState(ANIMATIONS.IDLE);
  const [currentExpression, setCurrentExpression] = useState('default');
  const { message } = useChat();

  // Handle message-based animations
  useEffect(() => {
    if (!message) {
      // Only change to idle if we're currently in a talking animation
      setCurrentAnimation(prev => {
        const isTalking = ANIMATIONS.TALKING.includes(prev);
        return isTalking ? ANIMATIONS.IDLE : prev;
      });
      return;
    }
    
    if (message.animation) {
      setCurrentAnimation(message.animation);
    } else {
      const randomTalkingAnimation = ANIMATIONS.TALKING[Math.floor(Math.random() * ANIMATIONS.TALKING.length)];
      setCurrentAnimation(randomTalkingAnimation);
    }
  }, [message]);

  return {
    currentAnimation,
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression
  };
};