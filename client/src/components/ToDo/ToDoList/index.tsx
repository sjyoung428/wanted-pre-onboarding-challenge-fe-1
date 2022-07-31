import ToDoAPI from "@/api/toDo";
import { useAuthStore } from "@/store/useAuthStore";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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
      <List
        sx={{
          width: "60%",
          height: "70vh",
          border: "1px solid black",
          overflow: "scroll",
        }}
      >
        {isLoading
          ? "Loading..."
          : data?.data.map((toDo) => (
              <div key={toDo.id}>
                <ListItem>
                  <Link to={`/todos/${toDo.id}`}>
                    <Typography>{toDo.title}</Typography>
                  </Link>
                </ListItem>
                <Divider />
              </div>
            ))}
      </List>
      <ToDoModalForm />
      <FloatingButton />
    </>
  );
};

export default ToDoList;
