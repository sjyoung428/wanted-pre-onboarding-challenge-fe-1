import ToDoAPI from "@/api/toDo";
import { useAuthStore } from "@/store/useAuthStore";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import FloatingButton from "../../FloatingButton";
import ToDoModalForm from "../FormModal";

const ToDoList = () => {
  const authToken = useAuthStore((state) => state.token);
  const { data, isLoading } = useQuery(["toDoList"], () =>
    ToDoAPI.getAll(authToken)
  );
  console.log(data);

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
