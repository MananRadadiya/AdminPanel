import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const isAuth = isAdminLoggedIn();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
