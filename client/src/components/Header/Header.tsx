import { useAuthStore } from "@/store/useAuthStore";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { S } from "./styled";
import { Helmet } from "react-helmet-async";
import useToastMessage from "@/hooks/common/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toastMessage";
import React from "react";

const Header = () => {
  const { token: authToken, removeToken } = useAuthStore();
  const homeURL = useMatch("/" || "/todos/*");
  const authURL = useMatch("/auth");
  const onLogout = () => {
    if (authToken) {
      removeToken("token");
      useToastMessage(TOAST_MESSAGE.AUTH.LOGOUT_SUCCESS, "error");
    }
  };
  console.log(homeURL);
  return (
    <>
      <Helmet>
        <title>사용자 인증</title>
      </Helmet>
      <S.Navigation>
        <Box />
        <S.Title>{homeURL ? "ToDoList" : authURL ? "Auth" : ""}</S.Title>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {authToken && (
            <Button variant="text" onClick={onLogout}>
              로그아웃
            </Button>
          )}
          {authURL && (
            <Button variant="text">
              <Link to="/">홈</Link>
            </Button>
          )}
        </Box>
      </S.Navigation>
    </>
  );
};

export default React.memo(Header);
