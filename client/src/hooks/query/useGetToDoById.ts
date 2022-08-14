import ToDoAPI from "@/api/toDo";
import { ToDoData } from "@/types/toDo";
import { useQuery, UseQueryOptions } from "react-query";

const useGetToDoById = (
  toDoId: string,
  authToken: string,
  options?: UseQueryOptions<{ data: ToDoData }, Error>
) => {
  return useQuery<{ data: ToDoData }, Error>(
    ["toDo", toDoId],
    () => ToDoAPI.getById({ toDoId, authToken }),
    options
  );
};

useGetToDoById.getKey = (toDoId: string) => ["toDoList", toDoId];

export default useGetToDoById;
