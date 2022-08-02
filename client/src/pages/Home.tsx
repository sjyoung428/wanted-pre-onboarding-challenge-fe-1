import ToDoList from "@/components/ToDo/ToDoList/ToDoList";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>투두 리스트</title>
      </Helmet>
      <ToDoList />
    </>
  );
};

export default Home;
