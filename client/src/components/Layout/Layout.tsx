import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/store/useAuthStore";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import { S } from "./styled";
import { LayoutProps } from "./types";
import shallow from "zustand/shallow";
// import ToDoModalForm from "../ToDo/Modal/FormModal";
import DeleteModal from "../ToDo/Modal/DeleteModal";
import FloatingButton from "../FloatingButton/FloatingButton";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
const ToDoModalForm = lazy(() => import("../ToDo/Modal/FormModal"));

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.authToken, shallow);

  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
      <ToastContainer />
      <Suspense fallback={<LoadingSpinner />}>
        <ToDoModalForm />
      </Suspense>
      <DeleteModal />
      {authToken && <FloatingButton />}
    </>
  );
};

export default Layout;
