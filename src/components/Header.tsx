import { useAuthStore } from "@/store/useAuthStore";
import { removeLocalStorage } from "@/utils/removeLocalStorage";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useMatch, useParams } from "react-router-dom";

const Navigation = styled.div`
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
`;

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
      <Navigation>
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
      </Navigation>
    </>
  );
};

export default Header;
