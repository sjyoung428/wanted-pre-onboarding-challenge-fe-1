import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";

const getToDoListOption = () => {
  return {
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
    },
  };
};

export default getToDoListOption;
