import { CircularProgress, Stack } from "@mui/material";

const ProgressionStatus = ({ status }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "200px" }}
    >
      {status === "loading" && <CircularProgress sx={{ color: "#194FFF" }} />}

      {status === "success" && (
        <svg
          className="checkmark-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path className="checkmark-check" fill="none" d="M14 27l7 7 17-17" />
        </svg>
      )}

      {status === "error" && (
        <svg
          className="crossmark-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="crossmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path className="crossmark-line1" d="M16 16 36 36" />
          <path className="crossmark-line2" d="M36 16 16 36" />
        </svg>
      )}
    </Stack>
  );
};

export default ProgressionStatus;
