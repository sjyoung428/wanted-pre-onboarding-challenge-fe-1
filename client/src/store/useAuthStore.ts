import { getLocalStorage } from "@/utils/getLocalStorage";
import { removeLocalStorage } from "@/utils/removeLocalStorage";
import { setLocalStorage } from "@/utils/setLocalStorage";
import create from "zustand";

interface AuthState {
  authToken: string;
}

interface AuthAction {
  setToken: (keyname: string, authToken: string) => void;
  removeToken: (keyname: string) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  // state
  authToken: getLocalStorage<string>("authToken") || "",
  // action
  setToken: (keyname, authToken) => {
    set(() => ({ authToken }));
    setLocalStorage(keyname, authToken);
  },
  removeToken: (keyname) => {
    set(() => ({ authToken: "" }));
    removeLocalStorage(keyname);
  },
}));
