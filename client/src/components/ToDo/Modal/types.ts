export interface ModalFormState {
  title: string;
  content: string;
}

export interface ToDoMutationState extends ModalFormState {
  authToken: string;
}

export interface ToDoMutationStateWithId extends ToDoMutationState {
  id: string;
}

export interface DeleteModalProps {
  setDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormModalProps {
  updateMode: boolean;
  id: string;
}
