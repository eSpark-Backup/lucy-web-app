import { IconButton, Stack, Typography } from "@mui/material";
import { deleteIcon } from "../../assets";

const FormHeader = ({ openModal, title, id }) => {
  return (
    <Stack
      sx={{ maxWidth: "862px", mb: 2 }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "#202224",
          fontFamily: "Poppins",
          fontStyle: "bold",
        }}
      >
        {title}
      </Typography>
      {id ? (
        <IconButton onClick={openModal} sx={{ padding: 0 }}>
          <img src={deleteIcon} alt="delete" />
        </IconButton>
      ) : null}
    </Stack>
  );
};

export default FormHeader;
