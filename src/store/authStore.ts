import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rider } from '../types/user';

interface AuthState {
  rider: Rider | null;
  token: string | null;
  isAuthenticated: boolean;
  setRider: (rider: Rider) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      rider: null,
      token: null,
      isAuthenticated: false,
      setRider: (rider) => set({ rider }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logout: () => set({ rider: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
