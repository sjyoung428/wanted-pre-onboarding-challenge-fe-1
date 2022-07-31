import { ModalFormState } from "@/components/ToDo/FormModal";
import { AxiosResponse } from "axios";
import clientApi from "./axios";

type ToDoData = {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updatedAt: string;
};

const ToDoAPI = {
  create: async (
    body: ModalFormState,
    token: string
  ): Promise<{ data: ModalFormState }> => {
    const { data } = await clientApi.post("/todos", body, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  },

  getAll: async (token: string): Promise<{ data: ToDoData[] }> => {
    const response = await clientApi.get<{ data: ToDoData[] }>("/todos", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },

  getById: async (id: string, token: string): Promise<{ data: ToDoData }> => {
    const response = await clientApi.get<{ data: ToDoData }>(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },

  update: async (id: string, token: string): Promise<{ data: ToDoData }> => {
    const response = await clientApi.put<{ data: ToDoData }>(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },

  delete: async (id: string, token: string): Promise<{ data: null }> => {
    const response = await clientApi.delete<{ data: null }>(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },
};

export default ToDoAPI;
