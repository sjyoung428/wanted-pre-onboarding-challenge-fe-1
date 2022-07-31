import ToDoAPI from "@/api/toDo";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export interface ModalFormState {
  title: string;
  content: string;
}

const ToDoModalForm = () => {
  const { open, closeModal } = useModalStore();
  const { register, handleSubmit } = useForm<ModalFormState>();
  const authToken = useAuthStore((state) => state.token);

  const onValid = async ({ title, content }: ModalFormState) => {
    const data = await ToDoAPI.create({ title, content }, authToken);
    console.log(data);
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
          <Typography id="modal-modal-title">ToDo 작성하기</Typography>
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
