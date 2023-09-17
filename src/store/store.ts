import { create } from 'zustand';

interface ForgetStore {
  isForgotten: boolean;
  setForget: (value: boolean) => void; 
}

export const useForgetStore = create<ForgetStore>((set) => ({
  isForgotten: false,
  setForget: (value: boolean) => set({ isForgotten: value }), 
}));
