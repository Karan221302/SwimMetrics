import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

export default function ProtectedRoute({ children, roles }) {
  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  }

  if (roles) {
    const role = getRole();

    if (!roles.includes(role)) {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
}