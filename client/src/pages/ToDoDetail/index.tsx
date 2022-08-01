import { ToDoData } from "@/api/toDo";
import { useLocation, useOutletContext } from "react-router-dom";

const ToDoDetail = () => {
  const { id, content } = useOutletContext<ToDoData>();
  const { pathname } = useLocation();
  console.log(id);
  console.log(pathname.split("/")[2]);

  return (
    <>
      {id === pathname.split("/")[2] && (
        <>
          <span>{content}</span>
        </>
      )}
    </>
  );
};

export default ToDoDetail;
