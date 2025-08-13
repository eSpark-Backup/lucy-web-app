import { Box, LinearProgress } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import ContentForm from "../forms/ContentForm";
import { useParams } from "react-router-dom";
import { useGetSingleContentQuery } from "../../services/content";
import { useEffect, useState } from "react";

const contentTypeOptions = {
  press_release: "Press Release",
  instagram_post: "Instagram Post",
  facebook_post: "Facebook Post",
  newsletter: "Newsletter Inclusion",
  summary: "Summary",
};

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
      const myData = {
        content_type: contentTypeOptions[data?.content_type],
        description: data?.text_content,
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
      <FormHeader title={contentId ? "Edit Content" : "Add Content"} />
      <ContentForm
        data={contentId ? editData : undefined}
        contentId={contentId}
      />
    </Box>
  );
};

export default CreateContent;
