import { useAuthStore } from "@/store/useAuthStore";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";

const signUpOption = () => {
  const setFormType = useAuthStore((state) => state.setAuthFormType);
  return {
    onSuccess: () => {
      setFormType("login");
      useToastMessage(TOAST_MESSAGE.AUTH.REGISTER_SUCCESS, "success");
    },
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.EXIST_USER, "error");
    },
  };
};

export default signUpOption;
