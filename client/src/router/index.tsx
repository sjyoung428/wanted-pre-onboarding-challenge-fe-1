import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import ToDoDetail from "@/pages/ToDoDetail";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/todos/:id" element={<ToDoDetail />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default Router;
