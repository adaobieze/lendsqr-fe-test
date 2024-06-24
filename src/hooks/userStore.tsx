import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppUserState, AppUser } from '@/lib/types';

export const useUserStore = create<AppUserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (user: AppUser) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      setLoggedInFromToken: () => {
        const state = get();
        if (state.user) {
          set({ isLoggedIn: true });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
