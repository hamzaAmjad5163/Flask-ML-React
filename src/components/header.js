import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeaderLogo from "../assets/header.png";
import "../styles/header.css";

const HomePage = () => {
  const headerRef = useRef(null); 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".floating-image", {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(
          ".header-title",
          {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5" 
        )
        .from(
          ".header-description",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );

      gsap.to(".floating-image", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      gsap.to(".header-title", {
        textShadow: "0px 0px 20px rgba(0, 26, 255, 0.81)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={headerRef}
      id="header"
      className="d-flex justify-content-center align-items-center border-bottom"
    >
      <div className="row py-5">
        <div className="col-md-4 text-center">
          <img src={HeaderLogo} alt="Logo" className="floating-image" />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="header-title">Machine Learning App with React</h1>
          <p className="header-description">
            Discover amazing content and explore endless possibilities. Let’s
            build something amazing!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
