import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function PrivateRoute() {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
}