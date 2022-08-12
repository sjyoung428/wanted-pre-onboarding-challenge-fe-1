import { AuthResponse, EnterFormState } from "@/types/auth";
import clientApi from "./axios";

const AuthAPI = {
  login: async ({ email, password }: EnterFormState): Promise<AuthResponse> => {
    const { data } = await clientApi.post("/users/login", { email, password });
    return data;
  },

  signUp: async ({
    email,
    password,
  }: EnterFormState): Promise<AuthResponse> => {
    const { data } = await clientApi.post("/users/create", { email, password });
    return data;
  },
};

export default AuthAPI;
