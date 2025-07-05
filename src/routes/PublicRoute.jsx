// src/routes/PublicRoute.js
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <span className="spinner-border spinner-border-sm me-2"></span>
        Cargando...
      </div>
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (user.role === "agent") {
      return <Navigate to="/agent-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
