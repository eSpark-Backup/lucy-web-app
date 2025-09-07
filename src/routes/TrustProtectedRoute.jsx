import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TrustProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  const is_trust = user?.profile?.organization?.is_trust || false;

  if (is_trust) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default TrustProtectedRoute;
