import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import "../styles/carousel.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Carousel = () => {
  useEffect(() => {
    const container = document.querySelector(".our-work");
    const listItems = gsap.utils.toArray(".carousel__nav__item");
    const slides = gsap.utils.toArray(".carousel__item");

    if (!container || slides.length === 0 || listItems.length === 0) {
      console.error("Missing elements", { container, slides, listItems });
      return;
    }

    const tl = gsap.timeline();
    const myST = ScrollTrigger.create({
      animation: tl, // Animation timeline
      trigger: container, // Element to trigger the scroll
      start: "top top", // When the trigger hits the viewport
      end: `+=${container.clientHeight * (slides.length - 1)}`, // Total scrollable distance
      pin: container, // Keeps the container fixed during scroll
      scrub: true, // Smooth scrubbing effect
      snap: { snapTo: 1 / (slides.length - 1) }, // Snaps to slides
      markers: true, // Debugging markers
    });

    gsap.set(slides, {
      xPercent: () => (window.innerWidth < 768 ? 125 : 0),
      yPercent: () => (window.innerWidth > 768 ? 125 : 0),
      scale: 0.5,
      opacity: 0,
    });

    listItems.forEach((item, i) => {
      const targetLabel = `our-work-${i + 1}`;
      if (!tl.labels[targetLabel]) {
        console.error("Missing timeline label", targetLabel);
      }

      item.addEventListener("click", (e) => {
        e.preventDefault();
        const percent = tl.labels[targetLabel] / tl.totalDuration();
        const scrollPos = myST.start + (myST.end - myST.start) * percent;
        gsap.to(window, { duration: 2, scrollTo: scrollPos });
      });
    });
  }, []);

  return (
    <section className="our-work">
      <div className="container sticky">
        <div className="row align-items-center">
          <div className="col-12 col-md-4">
            <div className="title">How does it</div>
          </div>
          <div className="col-12 col-md-8 slider">
            <div className="carousel__slider">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="carousel__item"
                  id={`our-work-${index + 1}`}
                  key={index}
                >
                  <div className="blurred-box__step">{index + 1}</div>
                  <div className="blurred-box__title">
                    Step {index + 1} Title
                  </div>
                  <div className="blurred-box__footer">
                    <span className="blurred-box__footer-line"></span>
                    <p className="blurred-box__text">
                      Description for step {index + 1}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <ul className="carousel__nav">
              {Array.from({ length: 6 }).map((_, index) => (
                <li
                  className="carousel__nav__item"
                  data-target={`our-work-${index + 1}`}
                  key={index}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
