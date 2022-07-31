import { EnterFormState } from "@/pages/Auth/types";
import clientApi from "./axios";

interface AuthResponse {
  message: string;
  token: string;
}

const AuthAPI = {
  login: async (body: EnterFormState): Promise<AuthResponse> => {
    const response = await clientApi.post("/users/login", body);
    return response.data;
  },

  signUp: async (body: EnterFormState): Promise<AuthResponse> => {
    const response = await clientApi.post("/users/create", body);
    return response.data;
  },
};

export default AuthAPI;
