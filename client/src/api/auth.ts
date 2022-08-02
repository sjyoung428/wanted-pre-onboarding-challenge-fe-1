import { EnterFormState } from "@/pages/Auth/types";
import clientApi from "./axios";

export interface AuthResponse {
  message: string;
  token: string;
}

const AuthAPI = {
  login: async (body: EnterFormState): Promise<AuthResponse> => {
    const { data } = await clientApi.post("/users/login", body);
    return data;
  },

  signUp: async (body: EnterFormState): Promise<AuthResponse> => {
    const { data } = await clientApi.post("/users/create", body);
    return data;
  },
};

export default AuthAPI;
