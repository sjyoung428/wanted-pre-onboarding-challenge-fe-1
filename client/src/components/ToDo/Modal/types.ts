export interface ModalFormState {
  title: string;
  content: string;
}

export interface ToDoMutationState extends ModalFormState {
  authToken: string;
}

export interface ToDoMutationStateWithId extends ToDoMutationState {
  toDoId: string;
}
