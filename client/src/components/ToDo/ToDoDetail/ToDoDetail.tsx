import { ToDoData } from "@/api/toDo";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

const ToDoDetail = () => {
  const [checkId, setCheckId] = useState("");
  const { id, content } = useOutletContext<Pick<ToDoData, "id" | "content">>();
  const { pathname } = useLocation();

  useEffect(() => {
    setCheckId(pathname.split("/")[2]);
  }, [pathname]);

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
