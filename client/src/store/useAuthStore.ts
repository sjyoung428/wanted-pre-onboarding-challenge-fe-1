import { getLocalStorage } from "@/utils/getLocalStorage";
import { removeLocalStorage } from "@/utils/removeLocalStorage";
import { setLocalStorage } from "@/utils/setLocalStorage";
import create from "zustand";

interface AuthState {
  token: string;
}

interface AuthAction {
  setToken: (keyname: string, authToken: string) => void;
  removeToken: (keyname: string) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  // state
  token: getLocalStorage<string>("token") || "",
  // action
  setToken: (keyname, authToken) => {
    set(() => ({ token: authToken }));
    setLocalStorage(keyname, authToken);
  },
  removeToken: (keyname) => {
    set(() => ({ token: "" }));
    removeLocalStorage(keyname);
  },
}));
