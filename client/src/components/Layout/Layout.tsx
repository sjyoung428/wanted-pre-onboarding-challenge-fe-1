import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import { Suspense, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import { S } from "./styled";
import { LayoutProps } from "./types";
import shallow from "zustand/shallow";
import ToDoModalForm from "../ToDo/Modal/FormModal";
import DeleteModal from "../ToDo/Modal/DeleteModal";
import FloatingButton from "../FloatingButton/FloatingButton";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.authToken, shallow);

  const navigate = useNavigate();
  const authUrl = useMatch("/auth");
  useEffect(() => {
    if (!authToken) {
      navigate("/auth", { replace: true });
      if (!authUrl) {
        useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
      }
    }
  }, [authToken, navigate]);
  return (
    <>
      {/* {!authToken && <Navigate to="/auth" replace />} */}
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
