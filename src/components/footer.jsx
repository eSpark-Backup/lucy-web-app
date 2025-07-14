import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  footerLogo,
  facebook,
  instagram,
  google,
  twitter,
  linkedin,
  phone,
  email,
} from "../assets";
import { Link } from "react-scroll";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#282828",
        boxShadow: "0px 26.6px 53.2px 0px #0000001A",
        color: "#b5b5b5",
        pt: "83px",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={footerLogo}
                alt="EduPulse logo"
                sx={{ width: 273, height: 60 }}
              />

              <Typography
                sx={{
                  width: "80%",
                  fontSize: "19px",
                  fontWeight: 400,
                  color: "#FFF",
                }}
              >
                Edupulse is a cost-effective marketing app that enables schools
                to boost their visibility, attract more students and funding,
                and strengthen their reputation in the local community. It is
                the brainchild of former BBC journalist and marketing expert
                Lucy Hood.
              </Typography>
              {/* <Stack direction="row" spacing={1}>
                {[
                  { icon: <img src={facebook} alt="facebook" />, href: "#" },
                  { icon: <img src={instagram} alt="instagram" />, href: "#" },
                  { icon: <img src={google} alt="google" />, href: "#" },
                  { icon: <img src={twitter} alt="twitter" />, href: "#" },
                  { icon: <img src={linkedin} alt="linkedin" />, href: "#" },
                ].map(({ icon, href }, idx) => (
                  <IconButton
                    key={idx}
                    href={href}
                    target="_blank"
                    sx={{
                      p: 0.75,
                      color: "#d0d0d0",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Stack> */}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <Section
              heading="Company"
              links={[
                { label: "About us", route: "about" },
                { label: "Services", route: "services" },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <Section
              heading="Platform"
              links={[
                { label: "Wait list", route: "wait" },
                { label: "Solutions", route: "edu" },
              ]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Typography
              sx={{ color: "#FFF", fontSize: "21px", fontWeight: 600, mb: 2 }}
            >
              Contact
            </Typography>

            <Stack spacing={1.5}>
              {/* <ContactRow
                icon={<img src={phone} alt="linkedin" />}
                text="+123 456 7890"
              /> */}
              <ContactRow
                icon={<img src={email} alt="linkedin" />}
                text="hello@edupulse.co.uk"
              />
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
              fontSize: "18px",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            © 2025 Edupulse. All rights reserved.
          </Typography>

          {/* <Stack direction="row" flexWrap="wrap" spacing={3}>
            {["Privacy Policy", "Terms of Use", "Legal", "Site Map"].map(
              (label) => (
                <Link
                  key={label}
                  href="#"
                  underline="none"
                  sx={{ color: "#EBEBEB", fontSize: "18px", fontWeight: 400 }}
                >
                  {label}
                </Link>
              )
            )}
          </Stack> */}
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
      {links.map((item) => (
        <Link
          to={item?.route}
          smooth={true}
          style={{ cursor: "pointer" }}
          // sx={{ color: "#EBEBEB", fontSize: "21px", fontWeight: 400 }}
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
      <Typography sx={{ color: "#EBEBEB", fontSize: "21px", fontWeight: 400 }}>
        {text}
      </Typography>
    </Stack>
  );
}
