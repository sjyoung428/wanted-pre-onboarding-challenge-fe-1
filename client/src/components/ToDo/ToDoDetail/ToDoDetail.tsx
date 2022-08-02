import { ToDoData } from "@/api/toDo";
import useCheckIdByURL from "@/hooks/common/useCheckIdByURL";
import { Stack, Typography } from "@mui/material";
import { useLocation, useOutletContext } from "react-router-dom";

const ToDoDetail = () => {
  const { id, content } = useOutletContext<Pick<ToDoData, "id" | "content">>();
  const checkId = useCheckIdByURL();

  return (
    <>
      {id === checkId && (
        <>
          <Stack>
            <Typography>{content}</Typography>
          </Stack>
        </>
      )}
    </>
  );
};

export default ToDoDetail;
