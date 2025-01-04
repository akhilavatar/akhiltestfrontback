import { create } from 'zustand';

const useAvatarModelStore = create((set) => ({
  currentModel: '/models/64f1a714fe61576b46f27ca2.glb',
  setCurrentModel: (model) => set({ currentModel: model }),
}));

export const useAvatarModel = () => {
  return useAvatarModelStore();
};