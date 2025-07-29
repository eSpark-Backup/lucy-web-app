import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils";

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? <Navigate to={"/dashboard"} replace /> : children;
};

export default PublicRoute;
