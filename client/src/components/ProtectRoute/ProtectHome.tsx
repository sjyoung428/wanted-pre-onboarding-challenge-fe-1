import { useAuthStore } from "@/store/useAuthStore";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useToastMessage from "@/utils/toast/useToastMessage";
import { useEffect } from "react";
import { Navigate, useMatch } from "react-router-dom";
import shallow from "zustand/shallow";
import { ProtectRouteProps } from "./types";

const ProtectHome = ({ children }: ProtectRouteProps) => {
  const { authToken } = useAuthStore(
    (state) => ({ authToken: state.authToken }),
    shallow
  );

  const authUrl = useMatch("/auth");

  useEffect(() => {
    if (!authToken) {
      if (!authUrl) {
        useToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
      }
    }
  }, [authToken]);
  return <>{authToken ? children : <Navigate replace to="/auth" />}</>;
};

export default ProtectHome;
