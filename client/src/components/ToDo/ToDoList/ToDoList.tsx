import ToDoAPI from "@/api/toDo";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UpdatedAt from "@/components/UpdatedAt/UpdatedAt";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useAuthStore } from "@/store/useAuthStore";
import { Divider, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FloatingButton from "../../FloatingButton/FloatingButton";
import ToDoModalForm from "../FormModal/FormModal";

const ToDoList = () => {
  const authToken = useAuthStore((state) => state.token);
  const { data, isLoading } = useGetToDoList(authToken, {
    onError: (error) => {
      toast.error("로그인하고 이용해 주세요.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    },
  });
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data?.data.map((toDo) => (
            <div key={toDo.id}>
              <ListItem>
                <Link to={`/todos/${toDo.id}`}>
                  <Typography>{toDo.title}</Typography>
                  <UpdatedAt updatedAt={toDo.updatedAt} />
                </Link>
              </ListItem>
              <Divider />
            </div>
          ))
        )}
      </List>
      <ToDoModalForm />
      <FloatingButton />
    </>
  );
};

export default ToDoList;
