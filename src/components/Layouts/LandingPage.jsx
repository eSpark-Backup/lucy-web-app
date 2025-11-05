import { Container } from "@mui/material";
import { Element } from "react-scroll";
import Navbar from "../nav-bar";
import HeroSection from "../hero-section";
import LogoSlider from "../logo-slider";
import SolutionSection from "../solution-section";
import WaitList from "../wait-list";
import Services from "../services";
import About from "../about";
import Footer from "../footer";
import WaitlistModal from "../waitlist-modal";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    document.title = "Join the Waitlist | EduPulse GPT";
  }, []);

  return (
    <>
      <Navbar />
      <Element name="home">
        <HeroSection />
      </Element>
      <Container
        sx={{
          maxWidth: "1610px",
        }}
      >
        <LogoSlider />
        <Element name="edu">
          <SolutionSection />
        </Element>
      </Container>
      <Element name="wait">
        <WaitList />
      </Element>
      <Element name="services">
        <Services />
      </Element>
      <Container
        sx={{
          maxWidth: "1678px",
        }}
      >
        <Element name="about">
          <About />
        </Element>
      </Container>
      <Footer />
      <WaitlistModal />
    </>
  );
};

export default LandingPage;
