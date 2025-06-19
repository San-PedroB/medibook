
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentUserData } from "../services/userService";
import { useState, useEffect } from "react";

function PrivateRoute({ children, role: requiredRole }) {
  const { user, loading: authLoading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setAllowed(false);
      setProfileLoading(false);
      return;
    }

    (async () => {
      try {
        const profile = await getCurrentUserData();
        setAllowed(profile?.role === requiredRole);
      } catch {
        setAllowed(false);
      } finally {
        setProfileLoading(false);
      }
    })();
  }, [authLoading, user, requiredRole]);

  if (authLoading || profileLoading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
