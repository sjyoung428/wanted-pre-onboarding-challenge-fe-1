import {
  ToDoMutationState,
  ToDoMutationStateWithId,
} from "@/components/ToDo/Modal/types";
import clientApi from "./axios";

export type ToDoData = {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updatedAt: string;
};

export interface IdAndToken {
  id: string;
  authToken: string;
}

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

  getAll: async (token: string): Promise<{ data: ToDoData[] }> => {
    const { data } = await clientApi.get<{ data: ToDoData[] }>("/todos", {
      headers: {
        Authorization: token,
      },
    });
    return data;
  },

  getById: async ({
    id,
    authToken,
  }: IdAndToken): Promise<{ data: ToDoData }> => {
    const { data } = await clientApi.get<{ data: ToDoData }>(`/todos/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return data;
  },

  update: async ({
    id,
    title,
    content,
    authToken,
  }: ToDoMutationStateWithId): Promise<{ data: ToDoData }> => {
    const { data } = await clientApi.put<{ data: ToDoData }>(
      `/todos/${id}`,
      { title, content },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return data;
  },

  delete: async ({ id, authToken }: IdAndToken): Promise<{ data: null }> => {
    const { data } = await clientApi.delete<{ data: null }>(`/todos/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return data;
  },
};

export default ToDoAPI;
