import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { componentStyles } from "../../style/componentStyles";
import bgImage from "../../assets/images/sub-plan.png";
import { GLOBAL_SUBSCRIPTION_PLAN_DATA } from "../../constant";
import { Link, useNavigate } from "react-router-dom";

const Subplan = () => {
  const { title, description, skipText, cards } =
    GLOBAL_SUBSCRIPTION_PLAN_DATA || {};
  const { subscriptionPlanScreenStyles } = componentStyles || {};
  const navigate = useNavigate();

  const {
    containerBoxStyle,
    innerBoxStyle,
    titleStyle,
    descriptionStyle,
    cardStyle,
    cardContent,
    cardBoxStyle,
    skipLinkStyle,
    subText,
    buttonWrapper,
    buttonStyle,
    buttonText,
    price,
  } = subscriptionPlanScreenStyles || {};

  const handleClick = (link) => {
    navigate(`${link}`);
  };

  return (
    <Box sx={containerBoxStyle(bgImage)}>
      <Box sx={innerBoxStyle}>
        <Stack width={"100%"}>
          <Stack alignSelf={"flex-end"} px={2}>
            <Typography variant="h4" sx={skipLinkStyle}>
              <Link
                to={"/auth/login"}
                style={{ textDecoration: "none", color: "#5088FF" }}
              >
                {skipText}
              </Link>
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography sx={titleStyle}>{title}</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              gap={4}
            >
              <Typography variant="h3" sx={descriptionStyle}>
                {description}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={cardBoxStyle}>
            {cards?.map((plan, index) => (
              <Card key={index} sx={cardStyle}>
                <CardContent sx={cardContent}>
                  <Typography variant="h4" sx={title}>
                    {plan?.title}
                  </Typography>
                  <Typography variant="body1" sx={description}>
                    {plan?.subtitle}
                  </Typography>
                  <Typography variant="h1" sx={price}>
                    {plan?.price}
                  </Typography>
                  <Typography variant="body1" sx={subText}>
                    {plan?.per}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" sx={subText}>
                    {plan?.description}
                  </Typography>
                  <Divider sx={{ mt: "auto" }} />
                </CardContent>
                <Box sx={buttonWrapper}>
                  <Button
                    variant="outlined"
                    sx={buttonStyle}
                    onClick={() => handleClick(plan?.buttonLink)}
                  >
                    <Typography variant="body1" sx={buttonText}>
                      {plan?.buttonText}
                    </Typography>
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Subplan;
