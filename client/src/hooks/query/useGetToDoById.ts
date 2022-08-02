import ToDoAPI, { ToDoData } from "@/api/toDo";
import { useQuery, UseQueryOptions } from "react-query";

const useGetToDoById = (
  id: string,
  authToken: string,
  options?: UseQueryOptions<{ data: ToDoData }, Error>
) => {
  return useQuery<{ data: ToDoData }, Error>(
    ["toDo", id],
    () => ToDoAPI.getById({ id, authToken }),
    options
  );
};

useGetToDoById.getKey = (id: string) => ["toDoList", id];

export default useGetToDoById;
