import { create } from 'zustand';

interface ForgetStore {
  isForgotten: boolean;
  setForget: (value: boolean) => void; 
}

export const useForgetStore = create<ForgetStore>((set) => ({
  isForgotten: false,
  setForget: (value: boolean) => set({ isForgotten: value }), 
}));

interface TabContentStore{
  isPopular : boolean,
  setPopular :(value: boolean) => void;
}

export const useTabContentStore = create<TabContentStore>((set) => ({
  isPopular: false,
  setPopular: (value: boolean) => set({ isPopular: value }), 
}));


interface userLogin {
  user: string,
  email: string,
  roles: [],
  fullname: string,
  picture: string,

}

interface UserStore {
  user: userLogin | null;
  setUser: (user: userLogin | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));