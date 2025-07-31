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
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", fontFamily: "Nunito Sans", mb: 3 }}
      >
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
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#202224",
                  fontFamily: "Nunito Sans",
                }}
              >
                {plan?.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: "#212121",
                  fontFamily: "Nunito Sans",
                }}
              >
                {plan?.description}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: "#4880FF",
                  mb: 1,
                  fontFamily: "Nunito Sans",
                }}
              >
                {plan.price}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#212121", fontFamily: "Nunito Sans" }}
              >
                Per School/Months
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="body1"
                sx={{ color: "#212121", fontFamily: "Nunito Sans" }}
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
                <Typography
                  variant="body1"
                  sx={{
                    color: "#4880FF",
                    fontFamily: "Nunito Sans",
                    fontWeight: 700,
                  }}
                >
                  Subscribe Now
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
