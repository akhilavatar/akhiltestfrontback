import React from 'react';
import { useAvatar } from '../../hooks/useAvatar';
import { AVATARS } from '../../constants/models';

export const AvatarSelector = () => {
  const { selectedAvatarId, setSelectedAvatarId } = useAvatar();

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatarId(avatarId);
  };

  return (
    <div className="bg-[#2e2e2e] rounded-lg overflow-hidden w-[340px] shadow-lg">
      <div className="bg-[#1e1e1e] px-3 py-2 text-white/80 text-sm font-medium border-b border-white/10">
        Avatar Selection
      </div>
      <div className="p-3">
        <div className="bg-[#262626] rounded flex">
          <button
            onClick={() => handleAvatarSelect(AVATARS.AVATAR_1.id)}
            className={`flex-1 px-3 py-1.5 text-sm transition-colors ${
              selectedAvatarId === AVATARS.AVATAR_1.id
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Avatar 1
          </button>
          <button
            onClick={() => handleAvatarSelect(AVATARS.AVATAR_2.id)}
            className={`flex-1 px-3 py-1.5 text-sm transition-colors ${
              selectedAvatarId === AVATARS.AVATAR_2.id
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Avatar 2
          </button>
        </div>
      </div>
    </div>
  );
};