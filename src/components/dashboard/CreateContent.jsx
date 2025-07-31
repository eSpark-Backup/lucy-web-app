import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import ContentForm from "../forms/ContentForm";

const CreateContent = () => {
  return (
    <Box>
      <FormHeader title={"Add Content"} />
      <ContentForm />
    </Box>
  );
};

export default CreateContent;
