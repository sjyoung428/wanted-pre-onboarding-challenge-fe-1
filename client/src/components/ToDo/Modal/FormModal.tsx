import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useCreateToDo from "@/hooks/query/useCreateToDo";
import useGetToDoById from "@/hooks/query/useGetToDoById";
import useUpdateToDo from "@/hooks/query/useUpdateToDo";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormModalStore } from "@/store/useFormModalStore";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { ModalFormState } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useToDoStore } from "@/store/useToDoStore";
import shallow from "zustand/shallow";

const ToDoModalForm = () => {
  const { open, closeModal } = useFormModalStore();
  const { authToken } = useAuthStore(
    (state) => ({ authToken: state.authToken }),
    shallow
  );
  const { updateMode, toDoId } = useToDoStore(
    (state) => ({ updateMode: state.updateMode, toDoId: state.toDoId }),
    shallow
  );

  const { register, handleSubmit, reset } = useForm<ModalFormState>();
  const queryClient = useQueryClient();
  // 투두 생성 커스텀 뮤테이션 훅
  const { mutate: createToDo } = useCreateToDo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetToDoList.getKey(authToken));
      useToastMessage(TOAST_MESSAGE.TODO.CREATE_SUCCESS, "success");
    },
  });
  // 투두 업데이트 커스텀 뮤테이션 훅
  const { mutate: updateToDo } = useUpdateToDo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetToDoList.getKey(authToken));
      useToastMessage(TOAST_MESSAGE.TODO.UPDATE_SUCCESS, "success");
    },
  });

  const { data, isLoading } = useGetToDoById(toDoId, authToken, {
    enabled: updateMode ? true : false,
  });

  const onValid = async ({ title, content }: ModalFormState) => {
    if (!updateMode) {
      // 투두 생성
      if (title === "" || content === "") {
        useToastMessage(TOAST_MESSAGE.TODO.NOT_ALLOW_EMPTY_STRING, "error");
        return;
      }
      createToDo({ title, content, authToken });
    } else {
      // 투두 업데이트
      if (title === "" || content === "") {
        useToastMessage(TOAST_MESSAGE.TODO.NOT_ALLOW_EMPTY_STRING, "error");
        return;
      }
      updateToDo({ toDoId, title, content, authToken });
    }
    reset();
    closeModal();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onValid)}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              marginBottom: "0.5rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {updateMode ? "ToDo 수정하기" : "ToDo 작성하기"}
          </Typography>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <TextField
              {...register("title")}
              placeholder={updateMode ? data?.data?.title : "제목"}
            />
          )}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <TextField
              {...register("content")}
              sx={{ mt: 2 }}
              multiline
              rows={4}
              placeholder={updateMode ? data?.data?.content : "내용"}
            />
          )}
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            {updateMode ? "수정하기" : "작성하기"}
          </Button>
          <Stack
            flexDirection="row"
            justifyContent="flex-end"
            sx={{ order: -1 }}
          >
            <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ToDoModalForm;
