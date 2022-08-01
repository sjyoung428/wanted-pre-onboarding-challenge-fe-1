export interface ModalFormState {
  title: string;
  content: string;
}

export interface ToDoMutationState extends ModalFormState {
  authToken: string;
}
