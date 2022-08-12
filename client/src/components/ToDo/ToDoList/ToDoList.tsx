import UpdatedAt from "@/components/UpdatedAt/UpdatedAt";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useAuthStore } from "@/store/useAuthStore";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import FloatingButton from "../../FloatingButton/FloatingButton";
import ToDoModalForm from "../Modal/FormModal";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteToDo from "@/hooks/query/useDeleteToDo";
import DeleteModal from "../Modal/DeleteModal";
import { useDeleteModalStore } from "@/store/useDeleteModalStore";
import { useEffect, useState } from "react";
import { useUpdateToDoStore } from "@/store/useUpdateToDoStore";
import useCheckIdByURL from "@/hooks/common/useCheckIdByURL";
import { useFormModalStore } from "@/store/useFormModalStore";
import ToDoSkeleton from "@/components/Loading/Skeleton/ToDoSkeleton";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import { useQueryClient } from "react-query";

const ToDoList = () => {
  const [deleteState, setDeleteState] = useState(false); // 투두를 지우기 위한 state
  const [toDoId, setToDoId] = useState("");
  const queryClient = useQueryClient();

  const { updateMode, setUpdateMode } = useUpdateToDoStore();
  const openDeleteModal = useDeleteModalStore((state) => state.openModal); // 투두 리스트 지우는 것 확인하는 모달
  const openFormModal = useFormModalStore((state) => state.openModal); // 업데이트 폼 모달

  const checkId = useCheckIdByURL();

  const authToken = useAuthStore((state) => state.authToken);

  // 모든 투두 리스트 가져오기
  const { data, isLoading } = useGetToDoList(authToken, {
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
    },
  });

  // 투두 리스트 삭제
  const { mutate: deleteToDo } = useDeleteToDo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetToDoList.getKey(authToken)),
        useToastMessage(TOAST_MESSAGE.TODO.DELETE_SUCCESS, "success");
    },
  });

  const onDeleteButton = async (id: string) => {
    setToDoId(id);
    openDeleteModal();
  };

  useEffect(() => {
    if (deleteState) {
      deleteToDo({ id: toDoId, authToken });
      setDeleteState(false);
    }
  }, [deleteState]);

  // 투두 리스트 업데이트
  const onClickUpdate = (toDoId: string) => {
    setUpdateMode(true);
    setToDoId(toDoId);
    openFormModal();
  };

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
          borderRadius: "5px",
        }}
      >
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((item) => <ToDoSkeleton key={item} />)
          : data?.data.map((toDo) => (
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
                          <Typography
                            component="h2"
                            fontWeight={500}
                            fontSize="1.5rem"
                          >
                            {toDo.title}
                          </Typography>
                        </Link>

                        <UpdatedAt updatedAt={toDo.updatedAt} />
                      </Stack>
                      <Stack gap={2}>
                        <IconButton
                          onClick={() => onDeleteButton(toDo.id)}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Stack flexDirection="row" gap={1}>
                          {toDo.id === checkId && (
                            <Typography
                              onClick={() => onClickUpdate(toDo.id)}
                              sx={{
                                textAlign: "end",
                                color: "gray",
                                fontSize: "0.7rem",
                                cursor: "pointer",
                              }}
                            >
                              수정
                            </Typography> // 내용이 보일 때만
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Outlet
                      context={{
                        id: toDo.id,
                        content: toDo.content,
                        title: toDo.title,
                      }}
                    />
                  </>
                </Stack>
              </div>
            ))}
      </Stack>
      <ToDoModalForm updateMode={updateMode} id={toDoId} />
      <DeleteModal setDeleteState={setDeleteState} />
      {authToken && <FloatingButton />}
    </>
  );
};

export default ToDoList;
