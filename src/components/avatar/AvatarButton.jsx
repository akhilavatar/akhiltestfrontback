import React from 'react';

export const AvatarButton = ({ selected, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-colors ${
      selected
        ? 'bg-blue-500 text-white'
        : 'bg-white hover:bg-blue-100 text-gray-800'
    }`}
  >
    {label}
  </button>
);