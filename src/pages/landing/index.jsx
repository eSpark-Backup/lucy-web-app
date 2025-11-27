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
  WaitlistModal,
  TutotialSection,
} from "../../components";
import { Element } from "react-scroll";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Element name="home">
        <HeroSection />
      </Element>
      <Container maxWidth="xl">
        <LogoSlider />
        <Element name="tutorial">
          <TutotialSection />
        </Element>
        <Element name="edu">
          <SolutionSection />
        </Element>
      </Container>
      {/* <Element name="wait">
        <WaitList />
      </Element> */}
      <Element name="services">
        <Services />
      </Element>
      <Container maxWidth="xl">
        <Element name="about">
          <About />
        </Element>
        {/* <Element name="testimonials">
          <Reviews />
        </Element> */}
      </Container>
      <Footer />
      <WaitlistModal />
    </>
  );
};

export default LandingPage;
