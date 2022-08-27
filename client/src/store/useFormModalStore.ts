import create from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  open: boolean;
}

interface ModalAction {
  openModal: () => void;
  closeModal: () => void;
}

export const useFormModalStore = create<ModalState & ModalAction>()(
  devtools((set) => ({
    // state
    open: false,

    // action
    openModal: () => {
      set(() => ({ open: true }));
    },

    closeModal: () => {
      set(() => ({ open: false }));
    },
  }))
);
