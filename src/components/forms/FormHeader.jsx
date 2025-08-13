import { IconButton, Stack, Typography } from "@mui/material";
import { deleteIcon } from "../../assets";
import { componentStyles } from "../../style/componentStyles";

const FormHeader = ({ openModal, title, id }) => {
  const { FormHeaderStyle } = componentStyles || {};
  const { boxStyle, titleStyle } = FormHeaderStyle || {};
  return (
    <Stack direction="row" sx={boxStyle}>
      <Typography variant="h2" sx={titleStyle}>
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
