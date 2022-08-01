import ToDoAPI, { ToDoData } from "@/api/toDo";
import { ToDoMutationState } from "@/components/ToDo/FormModal/types";
import { useMutation, UseMutationOptions } from "react-query";

const useCreateToDo = (
  options?: UseMutationOptions<{ data: ToDoData }, Error, ToDoMutationState>
) => {
  return useMutation<{ data: ToDoData }, Error, ToDoMutationState>(
    ToDoAPI.create,
    options
  );
};

export default useCreateToDo;
