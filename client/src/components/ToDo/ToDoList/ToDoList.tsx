import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UpdatedAt from "@/components/UpdatedAt/UpdatedAt";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Divider,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import FloatingButton from "../../FloatingButton/FloatingButton";
import ToDoModalForm from "../FormModal/FormModal";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteToDo from "@/hooks/query/useDeleteToDo";
import { useQueryClient } from "react-query";

const ToDoList = () => {
  const queryClient = useQueryClient();
  const authToken = useAuthStore((state) => state.token);

  // 모든 투두 리스트 가져오기
  const { data, isLoading } = useGetToDoList(authToken, {
    onError: (error) => {
      toast.error("로그인하고 이용해 주세요.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    },
  });

  // 투두 리스트 삭제
  const { mutate } = useDeleteToDo({
    onSuccess: async () =>
      await queryClient.refetchQueries(useGetToDoList.getKey(authToken)),
  });

  const onDelete = async (toDoId: string) => {
    mutate({ id: toDoId, authToken });
  };

  return (
    <>
      <Stack
        divider={<Divider />}
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
              <Stack
                flexDirection="column"
                sx={{
                  with: "100%",
                }}
              >
                <>
                  <Stack
                    width="100%"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Stack>
                      <Link to={`/todos/${toDo.id}`}>
                        <Typography>{toDo.title}</Typography>{" "}
                      </Link>

                      <UpdatedAt updatedAt={toDo.updatedAt} />
                    </Stack>
                    <IconButton
                      sx={{ zIndex: 999 }}
                      onClick={() => onDelete(toDo.id)}
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Outlet context={{ id: toDo.id, content: toDo.content }} />
                </>
              </Stack>
            </div>
          ))
        )}
      </Stack>
      <ToDoModalForm />
      <FloatingButton />
    </>
  );
};

export default ToDoList;
