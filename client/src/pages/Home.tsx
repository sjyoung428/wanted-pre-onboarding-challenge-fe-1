import AsyncBoundary from "@/components/Boundary/AsyncBoundary";
import ToDoSkeleton from "@/components/Loading/Skeleton/ToDoSkeleton";
import ToDoList from "@/components/ToDo/ToDoList/ToDoList";
import { Divider, Stack } from "@mui/material";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

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
        <AsyncBoundary
          errorFallback={<span>에러</span>}
          loadingFallback={[1, 2, 3, 4, 5, 6].map((item) => (
            <ToDoSkeleton key={item} />
          ))}
        >
          <ToDoList />
        </AsyncBoundary>
      </Stack>
    </>
  );
};

export default Home;
