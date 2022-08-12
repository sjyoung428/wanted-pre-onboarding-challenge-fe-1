import ToDoAPI from "@/api/toDo";
import { ToDoMutationState } from "@/components/ToDo/Modal/types";
import { ToDoData } from "@/types/toDo";
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
