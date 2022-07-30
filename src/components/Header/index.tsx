import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { S } from "./styled";

const Header = () => {
  const { token: authToken, removeToken } = useAuthStore();
  const authURL = useMatch("/auth");
  const onLogout = () => {
    if (authToken) {
      removeToken("token");
    }
  };

  return (
    <>
      <S.Navigation>
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
      </S.Navigation>
    </>
  );
};

export default Header;
