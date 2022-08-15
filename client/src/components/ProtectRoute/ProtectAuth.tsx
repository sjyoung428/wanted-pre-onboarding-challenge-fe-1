import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { ProtectRouteProps } from "./types";

const ProtectAuth = ({ children }: ProtectRouteProps) => {
  const { authToken } = useAuthStore(
    (state) => ({ authToken: state.authToken }),
    shallow
  );
  return <>{authToken ? <Navigate replace to="/" /> : children}</>;
};

export default ProtectAuth;
