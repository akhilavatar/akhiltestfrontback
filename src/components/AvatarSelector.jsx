import React from 'react';
import { useAvatarModel } from '../hooks/useAvatarModel';

const avatars = [
  { id: 1, path: '/models/avatar1.glb', label: 'Avatar 1' },
  { id: 2, path: '/models/avatar2.glb', label: 'Avatar 2' },
  { id: 3, path: '/models/avatar3.glb', label: 'Avatar 3' },
  { id: 4, path: '/models/avatar4.glb', label: 'Avatar 4' },
  { id: 5, path: '/models/64f1a714fe61576b46f27ca2.glb', label: 'Default Avatar' },
];

export const AvatarSelector = () => {
  const { currentModel, setCurrentModel } = useAvatarModel();

  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg pointer-events-auto">
      <h3 className="text-gray-800 font-semibold mb-2">Select Avatar</h3>
      <div className="flex flex-col gap-2">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setCurrentModel(avatar.path)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentModel === avatar.path
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-blue-100 text-gray-800'
            }`}
          >
            {avatar.label}
          </button>
        ))}
      </div>
    </div>
  );
};