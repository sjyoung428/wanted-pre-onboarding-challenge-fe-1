import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UpdatedAt from "@/components/UpdatedAt/UpdatedAt";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useAuthStore } from "@/store/useAuthStore";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import FloatingButton from "../../FloatingButton/FloatingButton";
import ToDoModalForm from "../Modal/FormModal";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteToDo from "@/hooks/query/useDeleteToDo";
import { useQueryClient } from "react-query";
import DeleteModal from "../Modal/DeleteModal";
import { useDeleteModalStore } from "@/store/useDeleteModalStore";
import { useEffect, useState } from "react";
import useToastMessage from "@/hooks/common/useToastMessage";

const ToDoList = () => {
  const [deleteState, setDeleteState] = useState(false); // 투두를 지우기 위한 state
  const [toDoId, setToDoId] = useState("");
  const openModal = useDeleteModalStore((state) => state.openModal);
  const queryClient = useQueryClient();
  const authToken = useAuthStore((state) => state.token);

  // 모든 투두 리스트 가져오기
  const { data, isLoading } = useGetToDoList(authToken, {
    onError: (error) => {
      useToastMessage("로그인하고 이용해 주세요.", "error");
    },
  });

  // 투두 리스트 삭제
  const { mutate } = useDeleteToDo({
    onSuccess: async () =>
      await queryClient.refetchQueries(useGetToDoList.getKey(authToken)),
  });

  const onDeleteButton = async (id: string) => {
    setToDoId(id);
    openModal();
  };

  useEffect(() => {
    if (deleteState) {
      mutate({ id: toDoId, authToken });
      setDeleteState(false);
    }
  }, [deleteState]);
  return (
    <>
      <Stack
        divider={<Divider sx={{ margin: "0.5rem 0" }} />}
        sx={{
          width: "60%",
          height: "70vh",
          border: "1px solid black",
          overflow: "scroll",
          padding: "1rem 1rem",
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
                    <Stack gap={2}>
                      <IconButton
                        sx={{ zIndex: 999 }}
                        onClick={() => onDeleteButton(toDo.id)}
                        aria-label="delete"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          textAlign: "end",
                          color: "gray",
                          fontSize: "0.7rem",
                          cursor: "pointer",
                        }}
                      >
                        수정
                      </Typography>
                    </Stack>
                  </Stack>
                  <Outlet context={{ id: toDo.id, content: toDo.content }} />
                </>
              </Stack>
            </div>
          ))
        )}
      </Stack>
      <ToDoModalForm />
      <DeleteModal setDeleteState={setDeleteState} />
      <FloatingButton />
    </>
  );
};

export default ToDoList;
