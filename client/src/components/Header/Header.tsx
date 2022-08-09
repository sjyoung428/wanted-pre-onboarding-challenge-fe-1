import { useAuthStore } from "@/store/useAuthStore";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { S } from "./styled";
import { Helmet } from "react-helmet-async";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import React from "react";

const Header = () => {
  const { authToken, removeToken } = useAuthStore();
  const rootURL = useMatch("/");
  const detailURL = useMatch("/todos/:id");
  const authURL = useMatch("/auth");
  const onLogout = () => {
    if (authToken) {
      removeToken("authToken");
      useToastMessage(TOAST_MESSAGE.AUTH.LOGOUT_SUCCESS, "error");
    }
  };
  const homeURL = rootURL || detailURL;
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
