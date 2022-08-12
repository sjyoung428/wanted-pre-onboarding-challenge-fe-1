import AuthAPI from "@/api/auth";
import { AuthResponse, EnterFormState } from "@/types/auth";
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
