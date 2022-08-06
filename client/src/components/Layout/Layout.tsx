import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import { S } from "./styled";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.authToken);
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
    </>
  );
};

export default Layout;
