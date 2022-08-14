import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useEffect } from "react";

const ToDoListError = () => {
  useEffect(() => {
    useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
  }, []);
  return <></>;
};

export default ToDoListError;
