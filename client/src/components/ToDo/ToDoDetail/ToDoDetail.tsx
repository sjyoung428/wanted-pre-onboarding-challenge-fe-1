import useCheckIdByURL from "@/hooks/common/useCheckIdByURL";
import { Divider, Stack, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ToDoData } from "@/types/toDo";

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
          <Stack
            sx={{
              border: "solid rgba(0,0,0,0.1)",
              borderRadius: "0.5rem",
              padding: "1rem 0.5rem",
            }}
            divider={<Divider sx={{ marginBottom: "1rem", marginTop: "0" }} />}
          >
            <Typography mb={1}>할 일</Typography>
            <Typography>{content}</Typography>
          </Stack>
        </>
      )}
    </>
  );
};

export default ToDoDetail;
