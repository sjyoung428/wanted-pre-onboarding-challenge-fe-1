import { AuthFormType } from "@/components/Auth/types";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { removeLocalStorage } from "@/utils/removeLocalStorage";
import { setLocalStorage } from "@/utils/setLocalStorage";
import create from "zustand";

interface AuthState {
  authFormType: AuthFormType;
  authToken: string;
}

interface AuthAction {
  setAuthFormType: (formType: AuthFormType) => void;
  setToken: (keyname: string, authToken: string) => void;
  removeToken: (keyname: string) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  // state
  authFormType: "login",
  authToken: getLocalStorage<string>("authToken") || "",
  // action
  setAuthFormType: (formType) => {
    set(() => ({ authFormType: formType }));
  },

  setToken: (keyname, authToken) => {
    set(() => ({ authToken }));
    setLocalStorage(keyname, authToken);
  },
  removeToken: (keyname) => {
    set(() => ({ authToken: "" }));
    removeLocalStorage(keyname);
  },
}));
