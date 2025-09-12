import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SchoolProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);

  if (user?.role === "school") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default SchoolProtectedRoute;
