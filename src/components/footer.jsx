import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { footerLogo } from "../assets";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#282828",
        boxShadow: "0px 26.6px 53.2px 0px #0000001A",
        color: "#b5b5b5",
        pt: "40px",
      }}
    >
      <Container sx={{ maxWidth: { xs: "1200px", lg: "1300px" } }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={footerLogo}
                alt="EduPulse GPT logo"
                sx={{ width: { xs: 180, sm: 220, lg: 240 }, height: "auto" }}
              />

              <Typography
                sx={{
                  width: "80%",
                  fontSize: { xs: "14px", sm: "16px", lg: "18px" },
                  fontWeight: 400,
                  color: "#FFF",
                }}
              >
                EduPulse GPT is a cost-effective marketing app that enables
                schools to boost their visibility, attract more students and
                funding, and strengthen their reputation in the local community.
                It is the brainchild of former BBC journalist and marketing
                expert Lucy Hood.
                <br />
                By using this app, you acknowledge and agree that you do so at
                your own risk. The developer is not liable for any consequences
                arising from your use of the app.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Typography
              sx={{
                color: "#FFF",
                fontSize: { xs: "18px", sm: "23px", lg: "27px" },
                fontWeight: 600,
                mb: 1,
              }}
            >
              Contact
            </Typography>

            <Stack spacing={1.5}>
              <ContactRow text="info@edupulsegpt.com" />
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#DFDFDF1A", my: 4 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 0 }}
          justifyContent="center"
          alignItems="center"
          pb={3}
        >
          <Typography
            sx={{
              color: "#EBEBEB",
              fontSize: { xs: "14px", sm: "16px", lg: "18px" },
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            © {new Date()?.getFullYear()} EduPulse GPT. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

function Section({ heading, links }) {
  return (
    <Stack spacing={1.5}>
      <Typography sx={{ color: "#FFF", fontSize: "21px", fontWeight: 600 }}>
        {heading}
      </Typography>
      {links?.map((item, index) => (
        <Link
          key={index}
          to={item?.route}
          smooth={true}
          style={{ cursor: "pointer", width: "fit-content" }}
        >
          {item?.label}
        </Link>
      ))}
    </Stack>
  );
}

function ContactRow({ icon, text }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Link
        to="mailto:info@edupulsegpt.com"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography
          sx={{
            color: "#EBEBEB",
            fontSize: { xs: "14px", sm: "16px", lg: "18px" },
            fontWeight: 400,
          }}
        >
          {text}
        </Typography>
      </Link>
    </Stack>
  );
}
