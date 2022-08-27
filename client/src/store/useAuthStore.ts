import { AuthFormType } from "@/components/Auth/types";
import { getLocalStorage } from "@/utils/LocalStorage/getLocalStorage";
import { removeLocalStorage } from "@/utils/LocalStorage/removeLocalStorage";
import { setLocalStorage } from "@/utils/LocalStorage/setLocalStorage";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface AuthState {
  authFormType: AuthFormType;
  authToken: string;
}

interface AuthAction {
  setAuthFormType: (formType: AuthFormType) => void;
  setToken: (keyname: string, authToken: string) => void;
  removeToken: (keyname: string) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        // state
        authFormType: "login",
        // authToken: getLocalStorage<string>("authToken") || "",
        authToken: "",

        // action
        setAuthFormType: (formType) => {
          set(() => ({ authFormType: formType }));
        },

        setToken: (keyname, authToken) => {
          set(() => ({ authToken }));
          // setLocalStorage(keyname, authToken);
        },
        removeToken: (keyname) => {
          set(() => ({ authToken: "" }));
          // removeLocalStorage(keyname);
        },
      }),
      {
        name: "authToken",
      }
    )
  )
);
