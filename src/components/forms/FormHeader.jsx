import { Stack, Typography } from "@mui/material";

const FormHeader = ({ title }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: 700,
        color: "#202224",
        fontFamily: "Poppins",
        fontStyle: "bold",
        mb: 2,
      }}
    >
      {title}
    </Typography>
  );
};

export default FormHeader;
