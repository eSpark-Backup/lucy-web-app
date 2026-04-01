import { Box } from "@mui/material";
import {
  Navbar,
  HeroSection,
  LogoSlider,
  Footer,
  TutotialSection,
  WhoIsThisFor,
  TestimonialSection,
  BuiltByExperts,
  FlexiblePlans,
} from "../../components";
import { Element } from "react-scroll";

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <WhoIsThisFor />
      <Element name="howItWorks">
        <TutotialSection />
      </Element>
      <Element name="features">
        <Box sx={{ boxShadow: "0 0 8px rgba(0,0,0,0.06)" }}>
          <LogoSlider />
        </Box>
      </Element>
      <Element name="testimonials">
        <TestimonialSection />
      </Element>
      <Element name="pricing">
        <FlexiblePlans />
      </Element>
      <BuiltByExperts />
      <Footer />
    </Box>
  );
};

export default LandingPage;
