import { ToDoData } from "@/api/toDo";
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
          <span>{content}</span>
        </>
      )}
    </>
  );
};

export default ToDoDetail;
