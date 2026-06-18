import React, { useRef, useState } from "react";
import { navLinks } from "../../constants/navbarConstants";
import "./NavBar.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import resumePdf from "../../assets/files/Sagarsingh_khangarot__SSkResume.pdf";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const NavBar = () => {
  const panelRef = useRef(null);
  const [open, setopen] = useState(false);

  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, {
      height: 0,
      opacity: 0,
      y: -8,
      pointerEvents: "none",
    });
  }, []);

  const animatePanel = (next) => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.to(panel, {
      height: next ? "auto" : 0,
      opacity: next ? 1 : 0,
      y: next ? 0 : -8,
      duration: 0.25,
      ease: "power2.Out",
      onStart: () => gsap.set(panel, { pointerEvents: "auto" }),
      onComplete: () => {
        if (!next) gsap.set(panel, { pointerEvents: "none" });
      },
    });
  };

  const togglePanel = () => {
    setopen((prev) => {
      const next = !prev;
      animatePanel(next);
      return next;
    });
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    const e1 = document.getElementById(id);
    if (!e1) return;

    if (open) {
      setopen(false);
      animatePanel(false);
    }

    ScrollTrigger.refresh();
    gsap.to(window, {
      duration: 1,
      ease: "power3.Out",
      scrollTo: { y: e1, offsetY: 80 },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <a
          className="nav-home"
          href="#home"
          onClick={goTo("home")}
          aria-label="Home"
        >
          <img src="src/assets/images/common/icons8-home.svg" alt="" />
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={goTo(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="download-button"
              href={resumePdf}  
              download="Sagarsingh_khangarot__SSkResume.pdf"
            >
              RESUME
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={`nav-burger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={togglePanel}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div ref={panelRef} id="nav-panel" className="nav-panel">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={goTo(link.id)}>
            {link.label}
          </a>
        ))}
        <a
          className="download-button"
          href={resumePdf}
          download="Sagarsingh_khangarot__SSkResume.pdf"
        >
          RESUME
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
