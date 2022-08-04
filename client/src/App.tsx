import Router from "@/router/router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import useToastMessage from "@/hooks/common/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toastMessage";

function App() {
  const authToken = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
      navigate("/auth");
    }
  }, [authToken, navigate]);
  console.log("1");
  return (
    <>
      <Router />
    </>
  );
}

export default App;
