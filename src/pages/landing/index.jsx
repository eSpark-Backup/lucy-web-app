import { Box, Container } from "@mui/material";
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
      <Container maxWidth="xl">
        <LogoSlider />
        <SolutionSection />
      </Container>
      <WaitList />
      <Services />
      <Container maxWidth="xl">
        <About />
        <Reviews />
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
