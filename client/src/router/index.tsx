import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import ToDoDetail from "@/pages/ToDoDetail";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/todos/:id" element={<ToDoDetail />} />
      </Routes>
    </>
  );
};

export default Router;
