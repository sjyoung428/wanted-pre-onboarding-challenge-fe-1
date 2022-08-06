import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "@/hooks/common/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { TOAST_MESSAGE } from "@/utils/toastMessage";
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import { S } from "./styled";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const authUrl = useMatch("/auth");
  useEffect(() => {
    if (!authToken) {
      navigate("/auth");
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
