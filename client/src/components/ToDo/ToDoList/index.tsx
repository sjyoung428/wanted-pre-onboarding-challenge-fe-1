import ToDoAPI from "@/api/toDo";
import { useAuthStore } from "@/store/useAuthStore";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import FloatingButton from "../../FloatingButton";
import ToDoModalForm from "../FormModal";

const ToDoList = () => {
  const authToken = useAuthStore((state) => state.token);
  const { data, isLoading } = useQuery(
    ["toDoList", authToken],
    () => ToDoAPI.getAll(authToken),
    {
      onError: (error) => {
        toast.error("로그인하고 이용해 주세요.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
          draggable: true,
        });
      },
    }
  );

  return (
    <>
      <Box
        sx={{
          width: "60%",
          height: "70vh",
          border: "1px solid black",
        }}
      >
        {isLoading
          ? "Loading..."
          : data?.data.map((toDo) => (
              <Typography key={toDo.id}>{toDo.title}</Typography>
            ))}
      </Box>
      <ToDoModalForm />
      <FloatingButton />
    </>
  );
};

export default ToDoList;
