import { Box, LinearProgress } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import ContentForm from "../forms/ContentForm";
import { useParams } from "react-router-dom";
import { useGetSingleContentQuery } from "../../services/content";
import { useEffect, useState } from "react";
import BackButton from "../BackButton";

const CreateContent = () => {
  const { eventId, contentId } = useParams();
  const { data, isLoading, isSuccess } = useGetSingleContentQuery(
    {
      eventId,
      contentId,
    },
    { skip: !contentId, refetchOnMountOrArgChange: true }
  );
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (isSuccess && data) {
      const myRecipeints = data?.content_recipients?.map(
        (item) => item?.recipient
      );

      const mappedContent = data?.content_types.map((type, index) => ({
        content_types: type,
        text: data?.text_content[index] || "",
      }));

      const myData = {
        content_types: data?.content_types,
        text_content: mappedContent,
        description: "",
        image: data?.attachment,
        post_method: "Email",
        recipients: myRecipeints,
      };

      setEditData(myData);
    }
  }, [data, isSuccess]);

  if (isLoading || (contentId && Object.keys(editData)?.length === 0)) {
    return <LinearProgress />;
  }
  return (
    <Box>
      <BackButton />
      <FormHeader title={contentId ? "Edit Content" : "Create Content"} />
      <ContentForm
        data={contentId ? editData : undefined}
        contentId={contentId}
      />
    </Box>
  );
};

export default CreateContent;
