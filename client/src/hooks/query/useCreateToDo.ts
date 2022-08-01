import clientApi from "@/api/axios";
import ToDoAPI, { ToDoData } from "@/api/toDo";
import {
  ModalFormState,
  ToDoMutationState,
} from "@/components/ToDo/FormModal/types";
import { useMutation, UseMutationOptions } from "react-query";

const useCreateToDo = (
  options?: UseMutationOptions<
    { data: ModalFormState },
    Error,
    ToDoMutationState
  >
) => {
  return useMutation<{ data: ModalFormState }, Error, ToDoMutationState>(
    ToDoAPI.create,
    options
  );
};

export default useCreateToDo;
