import { Typography } from "@mui/material";
import "./App.css";
import {
  HeroSection,
  LogoSlider,
  Navbar,
  Services,
  SolutionSection,
  WaitList,
} from "./components";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogoSlider />
      <SolutionSection />
      <WaitList />
      <Services />
    </>
  );
}

export default App;
