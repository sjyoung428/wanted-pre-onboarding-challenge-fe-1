import create from "zustand";

interface UpdateState {
  updateMode: boolean;
}

interface UpdateAction {
  setUpdateMode: (bool: boolean) => void;
}

export const useUpdateToDoStore = create<UpdateState & UpdateAction>((set) => ({
  // state
  updateMode: false,

  // action
  setUpdateMode: (bool) => {
    set(() => ({ updateMode: bool }));
  },
}));
