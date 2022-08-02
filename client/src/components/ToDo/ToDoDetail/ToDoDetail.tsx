import { ToDoData } from "@/api/toDo";
import useCheckIdByURL from "@/hooks/common/useCheckIdByURL";
import { Stack, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ToDoDetail = () => {
  const { id, content, title } =
    useOutletContext<Pick<ToDoData, "id" | "content" | "title">>();
  const checkId = useCheckIdByURL();
  return (
    <>
      {id === checkId && (
        <>
          <Helmet>
            <title>{`ToDo: ${title}`}</title>
          </Helmet>
          <Stack>
            <Typography>{content}</Typography>
          </Stack>
        </>
      )}
    </>
  );
};

export default ToDoDetail;
