import ToDoSkeleton from "@/components/Loading/Skeleton/ToDoSkeleton";
// import ToDoList from "@/components/ToDo/ToDoList/ToDoList";
import { Stack } from "@mui/material";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
const ToDoList = lazy(() => import("@/components/ToDo/ToDoList/ToDoList"));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>투두 리스트</title>
      </Helmet>
      <Stack
        sx={{
          width: "60%",
          height: "70vh",
          border: "1px solid black",
          overflow: "scroll",
          padding: "1rem 1rem",
          borderRadius: "5px",
        }}
      >
        <Suspense
          fallback={[1, 2, 3, 4, 5, 6].map((item) => (
            <ToDoSkeleton key={item} />
          ))}
        >
          <ToDoList />
        </Suspense>
      </Stack>
    </>
  );
};

export default Home;
