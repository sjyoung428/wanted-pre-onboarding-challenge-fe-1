import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import ToDoDetail from "@/components/ToDo/ToDoDetail/ToDoDetail";
import { Route, Routes } from "react-router-dom";
import ProtectHome from "@/components/ProtectRoute/ProtectHome";
import ProtectAuth from "@/components/ProtectRoute/ProtectAuth";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectHome>
              <Home />
            </ProtectHome>
          }
        >
          <Route path="/todos/:id" element={<ToDoDetail />} />
        </Route>
        <Route
          path="/auth"
          element={
            <ProtectAuth>
              <Auth />
            </ProtectAuth>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
