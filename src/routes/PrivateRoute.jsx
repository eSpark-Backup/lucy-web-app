import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils";
import { useGetUserWithTokenQuery } from "../services/auth";
import { logout, setRedirectToLogin } from "../store/slices/auth";
import { logo } from "../assets";
import { Box, LinearProgress } from "@mui/material";

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
      toast.error(error?.data?.message);
      navigate("/auth/login");
    }
  }, [isError, error]);
  return isLoading ? (
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
        <img src={logo} alt="logo" />
      </Box>
      <Box sx={{ width: "213px" }}>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    </Box>
  ) : isSuccess ? (
    children
  ) : (
    <Navigate to={"/auth/login"} replace />
  );
};

export default PrivateRoute;
