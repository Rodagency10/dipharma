import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Firebase v9 API

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
  resetError: () => void; // Nouvelle méthode pour réinitialiser l'erreur
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          set({ user: userCredential.user, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      setUser: (user) => set({ user }),

      resetError: () => set({ error: null }), // Reset l'erreur
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    },
  ),
);
