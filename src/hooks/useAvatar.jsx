import { createContext, useContext, useState, useEffect } from 'react';
import { AVATARS } from '../constants/models';

const AvatarContext = createContext();

const getInitialState = () => {
  try {
    const saved = localStorage.getItem('showAvatar');
    const savedAvatarId = localStorage.getItem('selectedAvatarId') || AVATARS.AVATAR_1.id;
    return {
      show: saved !== null ? JSON.parse(saved) : true,
      selectedAvatarId: savedAvatarId
    };
  } catch {
    return {
      show: true,
      selectedAvatarId: AVATARS.AVATAR_1.id
    };
  }
};

export const AvatarProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState);

  const toggleAvatar = (value) => {
    const newValue = typeof value === 'boolean' ? value : !state.show;
    setState(prev => ({ ...prev, show: newValue }));
    try {
      localStorage.setItem('showAvatar', JSON.stringify(newValue));
    } catch (error) {
      console.error('Failed to save avatar state:', error);
    }
  };

  const setSelectedAvatarId = (avatarId) => {
    console.log('Setting avatar ID:', avatarId); // Debug log
    setState(prev => ({ ...prev, selectedAvatarId: avatarId }));
    try {
      localStorage.setItem('selectedAvatarId', avatarId);
    } catch (error) {
      console.error('Failed to save selected avatar:', error);
    }
  };

  useEffect(() => {
    console.log('Current avatar state:', state); // Debug log
  }, [state]);

  return (
    <AvatarContext.Provider value={{
      showAvatar: state.show,
      setShowAvatar: toggleAvatar,
      selectedAvatarId: state.selectedAvatarId,
      setSelectedAvatarId
    }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};