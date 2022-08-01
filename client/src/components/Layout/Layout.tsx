import useToastMessage from "@/hooks/common/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import { S } from "./styled";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.token);

  useEffect(() => {
    // 토큰 유무에 따른 메세지 출력
    if (authToken) {
      useToastMessage("로그인 되었습니다.", "success");
    } else {
      useToastMessage("로그아웃 되었습니다.", "error");
    }
  }, [authToken]);

  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
      <ToastContainer />
    </>
  );
};

export default Layout;
