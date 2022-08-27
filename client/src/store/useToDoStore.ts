import create from "zustand";
import { devtools } from "zustand/middleware";

interface ToDoState {
  updateMode: boolean;
  clickedDelete: boolean;
  toDoId: string;
}

interface ToDoAction {
  setUpdateMode: (updateMode: boolean) => void;
  setClickedDelete: (clickedDelete: boolean) => void;
  setToDoId: (id: string) => void;
}

export const useToDoStore = create<ToDoState & ToDoAction>()(
  devtools((set) => ({
    // state
    updateMode: false,
    clickedDelete: false,
    toDoId: "",

    // action
    setUpdateMode: (updateMode) => {
      set(() => ({ updateMode }));
    },
    setClickedDelete: (clickedDelete) => {
      set(() => ({ clickedDelete }));
    },
    setToDoId: (toDoId) => set(() => ({ toDoId })),
  }))
);
