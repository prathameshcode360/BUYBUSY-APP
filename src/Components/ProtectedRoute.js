import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
