import create from "zustand";

interface ModalState {
  open: boolean;
}

interface ModalAction {
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  // state
  open: false,

  // action
  openModal: () => {
    set(() => ({ open: true }));
  },

  closeModal: () => {
    set(() => ({ open: false }));
  },
}));
