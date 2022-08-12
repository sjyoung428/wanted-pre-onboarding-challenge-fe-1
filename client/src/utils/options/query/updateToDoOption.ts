import useGetToDoList from "@/hooks/query/useGetToDoList";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useQueryClient } from "react-query";

const updateToDoOption = (authToken: string) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetToDoList.getKey(authToken));
      useToastMessage(TOAST_MESSAGE.TODO.UPDATE_SUCCESS, "success");
    },
  };
};

export default updateToDoOption;
