import AuthAPI, { AuthResponse } from "@/api/auth";
import { EnterFormState } from "@/pages/Auth/types";
import { useMutation, UseMutationOptions } from "react-query";

const useLogin = (
  options?: UseMutationOptions<AuthResponse, Error, EnterFormState>
) => {
  return useMutation<AuthResponse, Error, EnterFormState>(
    AuthAPI.login,
    options
  );
};

export default useLogin;
