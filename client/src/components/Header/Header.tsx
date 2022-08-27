import { useAuthStore } from "@/store/useAuthStore";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { S } from "./styled";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import shallow from "zustand/shallow";

const Header = () => {
  const { authToken, removeToken } = useAuthStore(
    (state) => ({ authToken: state.authToken, removeToken: state.removeToken }),
    shallow
  );
  const rootURL = useMatch("/");
  const detailURL = useMatch("/todos/:id");
  const authURL = useMatch("/auth");
  const onLogout = () => {
    if (authToken) {
      removeToken();
      useToastMessage(TOAST_MESSAGE.AUTH.LOGOUT_SUCCESS, "error");
    }
  };
  const homeURL = rootURL || detailURL;

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

export default Header;
