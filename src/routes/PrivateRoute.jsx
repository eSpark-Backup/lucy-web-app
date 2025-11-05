import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserWithTokenQuery } from "../services/auth";
import { logout, setRedirectToLogin } from "../store/slices/auth";
import { logo } from "../assets";
import { Box, LinearProgress } from "@mui/material";
import { isAuthenticated, isEmailVerified, isTermsAccepted } from "../utils";

const PrivateRoute = ({ children }) => {
  const redirectToLogin = useSelector((state) => state.auth.redirectToLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectToLogin) {
      navigate("/auth/login");
      dispatch(setRedirectToLogin(false));
    }
  }, [redirectToLogin, dispatch, navigate]);

  const { isLoading, isSuccess, isError, error } = useGetUserWithTokenQuery(
    isAuthenticated()
  );

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      toast.error(
        error?.data?.message || "Session expired, please log in again."
      );
      navigate("/auth/login");
    }
  }, [isError, error, dispatch, navigate]);

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated() && !isEmailVerified()) {
    return <Navigate to={`/auth/email-verification`} replace />;
  }

  if (isAuthenticated() && isEmailVerified() && !isTermsAccepted()) {
    return <Navigate to="/terms" replace />;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box>
          <img style={{ width: "300px" }} src={logo} alt="logo" />
        </Box>
        <Box sx={{ width: "213px" }}>
          <LinearProgress sx={{ width: "100%" }} />
        </Box>
      </Box>
    );
  }

  return isSuccess ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
