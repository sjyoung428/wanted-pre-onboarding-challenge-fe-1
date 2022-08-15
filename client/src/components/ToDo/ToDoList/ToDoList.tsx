import UpdatedAt from "@/components/UpdatedAt/UpdatedAt";
import useGetToDoList from "@/hooks/query/useGetToDoList";
import { useAuthStore } from "@/store/useAuthStore";
import { IconButton, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteToDo from "@/hooks/query/useDeleteToDo";
import { useDeleteModalStore } from "@/store/useDeleteModalStore";
import { useEffect } from "react";
import { useToDoStore } from "@/store/useToDoStore";
import useCheckIdByURL from "@/hooks/common/useCheckIdByURL";
import { useFormModalStore } from "@/store/useFormModalStore";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import { useQueryClient } from "react-query";
import shallow from "zustand/shallow";

const ToDoList = () => {
  const queryClient = useQueryClient();

  const { toDoId, clickedDelete, setToDoId, setUpdateMode, setClickedDelete } =
    useToDoStore(
      (state) => ({
        toDoId: state.toDoId,
        clickedDelete: state.clickedDelete,
        setToDoId: state.setToDoId,
        setUpdateMode: state.setUpdateMode,
        setClickedDelete: state.setClickedDelete,
      }),
      shallow
    );
  const openDeleteModal = useDeleteModalStore(
    (state) => state.openModal,
    shallow
  ); // 투두 리스트 지우는 것 확인하는 모달
  const openFormModal = useFormModalStore((state) => state.openModal, shallow); // 업데이트 폼 모달

  const checkId = useCheckIdByURL();

  const authToken = useAuthStore((state) => state.authToken, shallow);

  // 모든 투두 리스트 가져오기
  const { data: toDoList } = useGetToDoList(authToken, {
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

  const onDeleteButton = (id: string) => {
    setToDoId(id);
    openDeleteModal();
  };

  useEffect(() => {
    if (clickedDelete) {
      deleteToDo({ toDoId, authToken });
      setClickedDelete(false);
    }
  }, [clickedDelete]);

  // 투두 리스트 업데이트
  const onClickUpdate = (toDoId: string) => {
    setUpdateMode(true);
    setToDoId(toDoId);
    openFormModal();
  };
  return (
    <>
      {toDoList?.data.map((toDo) => (
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
    </>
  );
};

export default ToDoList;
