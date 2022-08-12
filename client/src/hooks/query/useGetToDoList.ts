import ToDoAPI from "@/api/toDo";
import { ToDoData } from "@/types/toDo";
import { useQuery, UseQueryOptions } from "react-query";

const useGetToDoList = (
  authToken: string,
  options?: UseQueryOptions<{ data: ToDoData[] }, Error>
) => {
  return useQuery<{ data: ToDoData[] }, Error>(
    ["toDoList", authToken],
    () => ToDoAPI.getAll(authToken),
    options
  );
};

useGetToDoList.getKey = (authToken: string) => ["toDoList", authToken]; // authToken 가져오기

export default useGetToDoList;
