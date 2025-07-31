import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { plans } from "../../constant";

const SubscriptionCard = () => {
  return (
    <>
      <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
        Choose Your Subscription Plan
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          gap: 3,
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        {plans.map((plan, index) => (
          <Card
            key={index}
            sx={{
              width: "350px",
              height: "460px",
              borderRadius: "24px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              textAlign: "center",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, fontSize: "22px" }}
              >
                {plan.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2, fontSize: "16px" }}
              >
                {plan.description}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#4880FF",
                  mb: 1,
                  fontSize: "46px",
                }}
              >
                {plan.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "16px" }}
              >
                Per School/Months
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "16px" }}
              >
                {plan.details}
              </Typography>
              <Divider sx={{ mt: "auto" }} />{" "}
            </CardContent>

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  width: "180px",
                  height: "60px",
                  borderColor: "#4880FF",
                  color: "#4880FF",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  margin: "auto",
                  "&:hover": {
                    backgroundColor: "#FFFFFF",
                    borderColor: "#4880FF",
                  },
                }}
              >
                Subscribe Now
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default SubscriptionCard;
