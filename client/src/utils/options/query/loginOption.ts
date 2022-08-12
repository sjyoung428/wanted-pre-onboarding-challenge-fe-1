import { useAuthStore } from "@/store/useAuthStore";
import { AuthResponse } from "@/types/auth";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useNavigate } from "react-router-dom";

const loginOption = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  return {
    onSuccess: (loginResponse: AuthResponse) => {
      setToken("authToken", loginResponse.token);
      useToastMessage(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS, "success");
      navigate("/");
    },
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.INVALID_LOGIN, "error");
    },
  };
};

export default loginOption;
