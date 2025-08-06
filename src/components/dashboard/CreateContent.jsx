import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import ContentForm from "../forms/ContentForm";
import { useParams } from "react-router-dom";

const CreateContent = () => {
  const { eventId, contentId } = useParams();
  return (
    <Box>
      <FormHeader title={contentId ? "Edit Content" : "Add Content"} />
      <ContentForm />
    </Box>
  );
};

export default CreateContent;
