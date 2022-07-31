import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header";
import { S } from "./styled";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
  const authToken = useAuthStore((state) => state.token);

  useEffect(() => {
    // 토큰 유무에 따른 메세지 출력
    if (authToken) {
      toast.success("로그인 되었습니다.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    } else {
      toast.error("로그아웃 되었습니다.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    }
    console.log(authToken);
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
