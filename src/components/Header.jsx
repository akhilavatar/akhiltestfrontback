import React from 'react';
import { useAvatar } from '../hooks/useAvatar';
import { AVATARS } from '../constants/models';

export const Header = ({ onClose }) => {
  const { selectedAvatarId, setSelectedAvatarId } = useAvatar();

  const handleAvatarSelect = (avatarId) => {
    console.log('Selecting avatar:', avatarId); // Debug log
    setSelectedAvatarId(avatarId);
  };

  return (
    <div className="self-start bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4 rounded-lg shadow-md flex flex-col gap-4 w-auto min-w-[300px] relative">
      <div>
        <h1 className="font-black text-xl text-white">Avatar</h1>
        <p className="text-white">My virtual assistant always here to assist you 💙</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleAvatarSelect(AVATARS.AVATAR_1.id)}
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            selectedAvatarId === AVATARS.AVATAR_1.id
              ? 'bg-blue-700 ring-2 ring-white'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Avatar 1
        </button>
        <button
          onClick={() => handleAvatarSelect(AVATARS.AVATAR_2.id)}
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            selectedAvatarId === AVATARS.AVATAR_2.id
              ? 'bg-blue-700 ring-2 ring-white'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Avatar 2
        </button>
      </div>
      <button 
        onClick={onClose}
        className="pointer-events-auto text-white hover:text-gray-200 focus:outline-none absolute -top-3 -right-3 bg-red-500 rounded-full p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};