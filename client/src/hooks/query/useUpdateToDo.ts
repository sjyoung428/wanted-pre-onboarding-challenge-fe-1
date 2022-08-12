import ToDoAPI from "@/api/toDo";
import { ToDoMutationStateWithId } from "@/components/ToDo/Modal/types";
import { ToDoData } from "@/types/toDo";
import { useMutation, UseMutationOptions } from "react-query";

const useUpdateToDo = (
  options?: UseMutationOptions<
    { data: ToDoData },
    Error,
    ToDoMutationStateWithId
  >
) => {
  return useMutation<{ data: ToDoData }, Error, ToDoMutationStateWithId>(
    ToDoAPI.update,
    options
  );
};

export default useUpdateToDo;
