import { toast } from "react-toastify";

type ToastType = "success" | "error";

const useToastMessage = (message: string, type: ToastType) => {
  if (type === "success") {
    toast.success(message, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      draggable: true,
    });
  }
  if (type === "error") {
    toast.error(message, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      draggable: true,
    });
  }
};
// 옵션을 사용할 때 지정 하게 할지는 조금 더 고민해보기
export default useToastMessage;
