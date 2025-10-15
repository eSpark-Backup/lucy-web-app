import { Navigate } from "react-router-dom";
import { isAuthenticated, isEmailVerified, isTermsAccepted } from "../utils";
const PublicRoute = ({ children }) => {
  if (isAuthenticated() && isEmailVerified() && isTermsAccepted()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
