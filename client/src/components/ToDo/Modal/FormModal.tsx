import useCreateToDo from "@/hooks/query/useCreateToDo";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import useUpdateToDo from "@/hooks/query/useUpdateToDo";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormModalStore } from "@/store/useFormModalStore";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { ModalFormState } from "./types";

interface FormModalProps {
  updateMode: boolean;
  id: string;
}

const ToDoModalForm = ({ updateMode, id }: FormModalProps) => {
  const queryClient = useQueryClient();
  const { open, closeModal } = useFormModalStore();
  const { register, handleSubmit, reset } = useForm<ModalFormState>();
  const authToken = useAuthStore((state) => state.token);
  const { mutate: createMutate } = useCreateToDo({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetToDoList.getKey(authToken));
    },
  });
  const { mutate: updateMutate } = useUpdateToDo({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetToDoList.getKey(authToken));
    },
  });

  const onValid = async ({ title, content }: ModalFormState) => {
    if (!updateMode) {
      // 투두 생성
      createMutate({ title, content, authToken });
    } else {
      // 투두 업데이트
      updateMutate({ id, title, content, authToken });
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
          <Typography id="modal-modal-title">
            {updateMode ? "ToDo 수정하기" : "ToDo 작성하기"}
          </Typography>
          <TextField {...register("title")} placeholder="제목" />
          <TextField
            {...register("content")}
            sx={{ mt: 2 }}
            multiline
            rows={4}
            placeholder="내용"
          />
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            작성하기
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ToDoModalForm;
