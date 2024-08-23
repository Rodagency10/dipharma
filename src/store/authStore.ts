import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from "firebase/auth";

// Définir l'interface pour le type de l'état de l'authentification
interface AuthState {
  user: User | null; // Utilisation du type 'User' de Firebase pour une meilleure sécurité de type
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  resetError: () => void;
}

// Création du store Zustand avec la persistance de l'état
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      // Écouter les changements d'état d'authentification de Firebase
      onAuthStateChanged(auth, (user) => {
        set({ user, loading: false });
      });

      return {
        user: null,
        loading: true, // Initialisation à 'true' jusqu'à ce que l'état d'authentification soit déterminé
        error: null,

        // Méthode pour gérer la connexion
        login: async (email: string, password: string) => {
          set({ loading: true, error: null });
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            set({ user: userCredential.user, loading: false });
          } catch (error: unknown) {
            let errorMessage = "Une erreur est survenue lors de la connexion.";
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, loading: false });
          }
        },

        // Méthode pour gérer la déconnexion
        logout: async () => {
          set({ loading: true, error: null });
          try {
            await signOut(auth);
            set({ user: null, loading: false });
          } catch (error: unknown) {
            let errorMessage = "Une erreur est survenue lors de la déconnexion.";
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            set({ error: errorMessage, loading: false });
          }
        },

        // Méthode pour définir l'utilisateur
        setUser: (user: User | null) => set({ user }),

        // Méthode pour réinitialiser l'erreur
        resetError: () => set({ error: null }),
      };
    },
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        // Ne persister que les informations essentielles de l'utilisateur
        user: state.user ? { uid: state.user.uid, email: state.user.email } : null,
      }),
    }
  )
);
