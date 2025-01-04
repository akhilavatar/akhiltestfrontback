import React from 'react';
import { useAvatarModel } from '../../hooks/useAvatarModel';
import { AVATAR_LIST } from '../../constants/avatars';
import { AvatarButton } from './AvatarButton';

export const AvatarSelector = () => {
  const { currentModel, setCurrentModel } = useAvatarModel();

  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg pointer-events-auto">
      <h3 className="text-gray-800 font-semibold mb-2">Select Avatar</h3>
      <div className="flex flex-col gap-2">
        {AVATAR_LIST.map((avatar) => (
          <AvatarButton
            key={avatar.id}
            selected={currentModel === avatar.path}
            onClick={() => setCurrentModel(avatar.path)}
            label={avatar.label}
          />
        ))}
      </div>
    </div>
  );
};