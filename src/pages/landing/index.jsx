import { Box } from "@mui/material";
import {
  Navbar,
  HeroSection,
  LogoSlider,
  SolutionSection,
  WaitList,
  Services,
  Footer,
  Reviews,
  About,
} from "../../components";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Box sx={{ px: { xs: "30px", md: "50px", lg: "90px" } }}>
        <LogoSlider />
        <SolutionSection />
      </Box>
      <WaitList />
      <Services />
      <About />
      <Reviews />
      <Footer />
    </>
  );
};

export default LandingPage;
