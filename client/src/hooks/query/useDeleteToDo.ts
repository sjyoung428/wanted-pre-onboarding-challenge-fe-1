import ToDoAPI, { IdAndToken } from "@/api/toDo";
import { useMutation, UseMutationOptions } from "react-query";

const useDeleteToDo = (
  options?: UseMutationOptions<{ data: null }, Error, IdAndToken>
) => {
  return useMutation<{ data: null }, Error, IdAndToken>(
    ToDoAPI.delete,
    options
  );
};

export default useDeleteToDo;
