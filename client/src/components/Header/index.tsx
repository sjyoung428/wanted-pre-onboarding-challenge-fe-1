import { useAuthStore } from "@/store/useAuthStore";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { S } from "./styled";

const Header = () => {
  const { token: authToken, removeToken } = useAuthStore();
  const authURL = useMatch("/auth");
  const homeURL = useMatch("/");
  const onLogout = () => {
    if (authToken) {
      removeToken("token");
    }
  };

  return (
    <>
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
          {!authURL ? (
            <Button variant="text" onClick={onLogout}>
              <Link to="/auth">
                {authToken ? "계정 바꾸러 가기" : "로그인하러 가기"}
              </Link>
            </Button>
          ) : (
            <Button variant="text">
              <Link to="/">홈</Link>
            </Button>
          )}
        </Box>
      </S.Navigation>
    </>
  );
};

export default Header;
