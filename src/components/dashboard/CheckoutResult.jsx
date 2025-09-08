import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreatePaymentMutation } from "../../services/payment";

const CheckoutResultPage = ({ resetForm }) => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [status, setStatus] = useState("loading"); // loading | success | cancel

  useEffect(() => {
    if (!sessionId) {
      setStatus("cancel");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await createPayment({ sessionId });
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Payment failed!");
          setStatus("cancel");
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "Payment successful!");
          if (resetForm) resetForm();
          setStatus("success");
        }
      } catch (err) {
        toast.error("Something went wrong!");
        console.error(err, "err");
        setStatus("cancel");
      }
    };

    verifyPayment();
  }, [sessionId, createPayment, navigate, resetForm]);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {status === "loading" && (
        <>
          <CircularProgress />
          <Typography variant="body1">Verifying your payment...</Typography>
        </>
      )}

      {status === "success" && (
        <>
          <Typography variant="h4" color="green">
            🎉 Payment Successful!
          </Typography>
        </>
      )}

      {status === "cancel" && (
        <>
          <Typography variant="h4" color="error">
            ❌ Payment Failed or Cancelled!
          </Typography>
          <Typography variant="body1">Please try again.</Typography>
        </>
      )}
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
        to="/dashboard"
        sx={{
          color: "#fff",
          maxWidth: "150px",
          height: { xs: "42px" },
          borderRadius: "8px",
          backgroundColor: "#4880FF",
          textWrap: "nowrap",
          "&:hover": {
            backgroundColor: "#3a6edc",
          },
          "&.Mui-disabled": {
            color: "#fff",
            backgroundColor: "#999",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, fontFamily: "Nunito Sans" }}
        >
          Go to Dashboard
        </Typography>
      </Button>
    </Box>
  );
};

export default CheckoutResultPage;
