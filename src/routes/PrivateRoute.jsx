import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children, role: requiredRole }) {
  const { user, loading } = useAuth();

  // Si el contexto está resolviendo, muestra un loader amigable
  if (loading) {
    return (
      <div className="text-center mt-5">
        <span className="spinner-border spinner-border-sm me-2"></span>
        Cargando...
      </div>
    );
  }

  // Si no hay usuario loggeado, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y no coincide, redirige a login
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Si todo bien, renderiza el contenido protegido
  return children;
}

export default PrivateRoute;
