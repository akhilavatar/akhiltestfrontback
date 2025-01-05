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
      setCurrentAnimation(ANIMATIONS.IDLE);
      return;
    }
    
    const talkingAnimation = message.animation || 
      ANIMATIONS.TALKING[Math.floor(Math.random() * ANIMATIONS.TALKING.length)];
    setCurrentAnimation(talkingAnimation);
  }, [message]);

  return {
    currentAnimation,
    setCurrentAnimation,
    currentExpression,
    setCurrentExpression
  };
};