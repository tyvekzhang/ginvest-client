import { APP_CONFIG } from '@/config';
import { signInWithEmailAndCode, signInWithEmailAndPassword } from '@/service/auth-service';
import type { EmailAndCodeRequest, OAuth2PasswordRequestForm, UserCredential } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: UserInfo | null;
  token: UserCredential | null;
  loading: boolean;
  login: (loginRequest: OAuth2PasswordRequestForm) => Promise<void>;
  loginWithCode: (loginRequest: EmailAndCodeRequest) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      loading: false,
      user: {
        name: 'Ginvest',
        avatar: '/admin.png',
      },
      login: async (loginRequest: OAuth2PasswordRequestForm) => {
        set({ loading: true });
        try {
          const response = await signInWithEmailAndPassword(loginRequest);
          set({
            token: response,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      loginWithCode: async (loginRequest: EmailAndCodeRequest) => {
        set({ loading: true });
        try {
          const response = await signInWithEmailAndCode(loginRequest);
          set({
            token: response,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.clear();
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },
    }),
    {
      name: APP_CONFIG.STORAGE_KEYS.AUTH,
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
