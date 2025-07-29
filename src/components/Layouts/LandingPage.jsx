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

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Element name="home">
        <HeroSection />
      </Element>
      <Container maxWidth="xl">
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
      <Container maxWidth="xl">
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
