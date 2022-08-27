import { AuthFormType } from "@/components/Auth/types";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface AuthState {
  authFormType: AuthFormType;
  authToken: string;
}

interface AuthAction {
  setAuthFormType: (formType: AuthFormType) => void;
  setToken: (authToken: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        // state
        authFormType: "login",
        authToken: "",

        // action
        setAuthFormType: (formType) => {
          set(() => ({ authFormType: formType }));
        },

        setToken: (authToken) => {
          set(() => ({ authToken }));
        },
        removeToken: () => {
          set(() => ({ authToken: "" }));
        },
      }),
      {
        name: "authToken",
      }
    )
  )
);
