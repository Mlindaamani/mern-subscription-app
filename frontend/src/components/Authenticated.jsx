import { Outlet, Navigate } from "react-router-dom";
import { authStore } from "../stores/authStore";

export const AuthenticationRequired = () => {
  const { isAuthenticated } = authStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login/"} replace />;
};
