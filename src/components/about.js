import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "../styles/about.css";

const AboutPage = () => {
  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const icons = document.querySelectorAll('.aboutSpan');

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;

      icons.forEach((icon, index) => {
        const offset = (index + 1) * 50; 
        gsap.to(icon, {
          x: scrollPosition * 0.1 + offset,
          opacity: 1 - scrollPosition * 0.001, 
          duration: 1,
          ease: "power2.inOut",
        });
      });
    });

    icons.forEach((icon) => {
      Draggable.create(icon, {
        type: "x,y", 
        bounds: { minX: -300, maxX: 300, minY: -200, maxY: 200 }, 
        edgeResistance: 0.65,
        throwProps: true,
        onPress: () => {
          gsap.to(icon, { scale: 1.2, duration: 0.2, ease: "power1.inOut" });
        },
        onRelease: () => {
          gsap.to(icon, { scale: 1, duration: 0.2, ease: "power1.inOut" }); 
        }
      });
    });

    icons.forEach((icon, index) => {
      const glowColor = icon.classList.contains('react') ? '#61dafb' :
                        icon.classList.contains('bootstrap') ? '#563d7c' :
                        icon.classList.contains('mysql') ? '#FFCB2B' :
                        icon.classList.contains('php') ? '#2C3E50' :
                        icon.classList.contains('python') ? '#306998' :
                        icon.classList.contains('ml') ? '#F8B400' : '#fff';

      gsap.fromTo(
        icon,
        {
          scale: 1,
          opacity: 0,
          y: -100,
          textShadow: `0 0 10px ${glowColor}, 0 0 30px ${glowColor}`,
        },
        {
          scale: 1.2 + Math.random() * 0.1,
          y: 0,
          opacity: 1,
          delay: index * 0.2, 
          duration: 1.5,
          ease: "bounce.out",
          repeat: -1,
          yoyo: true,
          textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }
      );
    });
  }, []);

  return (
    <section className="d-flex justify-content-center align-items-center border-bottom">
      <div className="row">
        <div className="col-12">
          <div className="d-flex gap-5 py-3">
            <span className="aboutSpan react">
              <i className="fab fa-react icon text-dark fs-1"></i>React
            </span>
            <span className="aboutSpan bootstrap">
              <i className="fab fa-bootstrap icon text-dark fs-1"></i>Bootstrap
            </span>
            <span className="aboutSpan mysql">
              <i className="fas fa-database icon text-dark fs-1"></i>MySQL
            </span>
            <span className="aboutSpan php">
              <i className="fab fa-php icon text-dark fs-1"></i>PHP
            </span>
            <span className="aboutSpan python">
              <i className="fab fa-python icon text-dark fs-1"></i>Python
            </span>
            <span className="aboutSpan ml">
              <i className="fas fa-robot icon text-dark fs-1"></i>ML
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
