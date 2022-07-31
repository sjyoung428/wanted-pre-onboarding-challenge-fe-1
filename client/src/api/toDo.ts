import { ModalFormState } from "@/components/ToDo/FormModal";
import clientApi from "./axios";

type ToDoData = {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updatedAt: string;
};

const ToDoAPI = {
  create: async (body: ModalFormState, token: string) => {
    const response = await clientApi.post<Promise<{ data: ToDoData }>>(
      "/todos",
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  getAll: async (token: string) => {
    const response = await clientApi.get<Promise<{ data: ToDoData[] }>>(
      "/todos",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  getById: async (id: string, token: string) => {
    const response = await clientApi.get<Promise<{ data: ToDoData }>>(
      `/todos/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  update: async (id: string, token: string) => {
    const response = await clientApi.put<Promise<{ data: ToDoData }>>(
      `/todos/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },

  delete: async (id: string, token: string) => {
    const response = await clientApi.get<Promise<{ data: null }>>(
      `/todos/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },
};

export default ToDoAPI;
