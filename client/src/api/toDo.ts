import {
  ToDoMutationState,
  ToDoMutationStateWithId,
} from "@/components/ToDo/Modal/types";
import { IdAndToken } from "@/types/auth";
import { ToDoData } from "@/types/toDo";
import clientApi from "./axios";

const ToDoAPI = {
  create: async ({
    title,
    content,
    authToken,
  }: ToDoMutationState): Promise<{ data: ToDoData }> => {
    const { data } = await clientApi.post(
      "/todos",
      { title, content },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return data;
  },

  getAll: async (authToken: string): Promise<{ data: ToDoData[] }> => {
    const { data } = await clientApi.get<{ data: ToDoData[] }>("/todos", {
      headers: {
        Authorization: authToken,
      },
    });
    return data;
  },

  getById: async ({
    toDoId,
    authToken,
  }: IdAndToken): Promise<{ data: ToDoData }> => {
    const { data } = await clientApi.get<{ data: ToDoData }>(
      `/todos/${toDoId}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return data;
  },

  update: async ({
    toDoId,
    title,
    content,
    authToken,
  }: ToDoMutationStateWithId): Promise<{ data: ToDoData }> => {
    const { data } = await clientApi.put<{ data: ToDoData }>(
      `/todos/${toDoId}`,
      { title, content },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return data;
  },

  delete: async ({
    toDoId,
    authToken,
  }: IdAndToken): Promise<{ data: null }> => {
    const { data } = await clientApi.delete<{ data: null }>(
      `/todos/${toDoId}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return data;
  },
};

export default ToDoAPI;
