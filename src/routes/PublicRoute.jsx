import { Navigate } from "react-router-dom";
import { isAuthenticated, isEmailVerified } from "../utils";

const PublicRoute = ({ children }) => {
  if (isAuthenticated() && isEmailVerified()) {
    return <Navigate to="/dashboard" replace />;
  }

  // if (isAuthenticated() && !isEmailVerified()) {
  //   return <Navigate to="/auth/email-verification" replace />;
  // }

  return children;
};

export default PublicRoute;
