import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { plans, SUBSCRIPTION_PLAN_DATA } from "../../constant";
import { componentStyles } from "../../style/componentStyles";

const SubscriptionCard = () => {
  const { heading, subPrice, button } = SUBSCRIPTION_PLAN_DATA || {};
  const { SubscriptionCardStyle } = componentStyles || {};
  const {
    headingStyle,
    container,
    card,
    cardContent,
    title,
    description,
    price,
    subText,
    buttonWrapper,
    buttonStyle,
    buttonText,
  } = SubscriptionCardStyle || {};

  return (
    <>
      <Typography variant="h2" sx={headingStyle}>
        {heading}
      </Typography>
      <Box sx={container}>
        {plans?.map((plan, index) => (
          <Card key={index} sx={card}>
            <CardContent sx={cardContent}>
              <Typography variant="h4" sx={title}>
                {plan?.title}
              </Typography>
              <Typography variant="body1" sx={description}>
                {plan?.description}
              </Typography>
              <Typography variant="h1" sx={price}>
                {plan?.price}
              </Typography>
              <Typography variant="body1" sx={subText}>
                {subPrice}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={subText}>
                {plan?.details}
              </Typography>
              <Divider sx={{ mt: "auto" }} />
            </CardContent>
            <Box sx={buttonWrapper}>
              <Button variant="outlined" sx={buttonStyle}>
                <Typography variant="body1" sx={buttonText}>
                  {button}
                </Typography>
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default SubscriptionCard;
