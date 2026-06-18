import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Warp from "./components/Warp/Warp";
import Cursor from "./ui/cursor/Cursor";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import WhoAmI from "./components/WhoAmI/WhoAmI";
import Experience from "./components/Experience/Experience";
import TechStack from "./components/TechStack/TechStack";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

return (
  <>
    <Warp />
    <Cursor />
    <NavBar />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Hero />
        <WhoAmI />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </div>
  </>
);
};

export default App;