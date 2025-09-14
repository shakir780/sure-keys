import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthRole = "tenant" | "landlord" | "agent" | null;

interface AuthState {
  email: string;
  phonenumber: string;
  name: string;
  role: AuthRole;
  token: string | null;
  setAuth: (
    payload: Partial<{
      email: string;
      phonenumber: string;
      name: string;
      role: AuthRole;
      token: string | null;
    }>
  ) => void;
  setRole: (role: AuthRole) => void;
  setEmail: (email: string) => void; // ✅ added

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      name: "",
      phonenumber: "",
      role: null,
      token: null,

      setRole: (role) => set({ role }),

      setAuth: (payload) => set((state) => ({ ...state, ...payload })),
      setEmail: (email) => set({ email }), // ✅ added

      clearAuth: () =>
        set({
          email: "",
          name: "",
          phonenumber: "",
          role: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
