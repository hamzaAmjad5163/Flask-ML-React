import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("down"); // 'down' or 'up'
  const carouselRef = useRef(null);

  const slides = [
    {
      image: "https://media2.giphy.com/media/3o7WTB4o4D0O9IQVQ4/giphy.webp?cid=ecf05e47vmgfj539vzs45xkf23kjqgxibxdupwfzbn6bwauq&ep=v1_gifs_related&rid=giphy.webp&ct=g",
      content: "Our ML model begins by analyzing images and files to detect potential antivirus-related threats. This process helps identify and filter harmful content in real-time.",
    },
    {
      image: "https://media4.giphy.com/media/3o85xkIc9YK1u4WWli/giphy.webp?cid=ecf05e47bjmqzs92d216vwlf0p57ju9brvw49mqme9e1666k&ep=v1_gifs_related&rid=giphy.webp&ct=g",
      content: "Files are uploaded to our system, where they are processed using sophisticated algorithms that detect patterns indicative of malware or antivirus-related files.",
    },
    {
      image: "https://media0.giphy.com/media/Yq9JyaabEf6mioes2s/giphy.webp?cid=ecf05e47lzx8q4vbm835ns2ajvu1hjht8ot1ou6u9epj398u&ep=v1_gifs_related&rid=giphy.webp&ct=g",
      content: "Images undergo a detailed scan to identify any visual patterns or characteristics that may indicate the presence of potentially harmful files.",
    },
    {
      image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExenBkN2twdHZwZTk5azFzaHlybGVkbTdiOWpvdXo5bTJ6ejg0dm1jbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IXnygGeB6LPPi/giphy.webp",
      content: "Our Flask backend communicates with the ML model to retrieve results and provide an instant report on whether the uploaded files are safe or contain malicious elements.",
    },
  ];

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      if (event.deltaY > 0) {
        // Scrolling down
        if (currentIndex < slides.length - 1) {
          setDirection("down");
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        // Scrolling up
        if (currentIndex > 0) {
          setDirection("up");
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
      }
    };

    const carouselElement = carouselRef.current;
    carouselElement.addEventListener("wheel", handleWheel);

    return () => {
      carouselElement.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const container = carouselRef.current;
    const imageElement = container.querySelector(".carousel-image");
    const contentElement = container.querySelector(".carousel-content");

    if (direction === "down") {
      gsap.to(imageElement, {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(contentElement, {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setDirection(""); 
        },
      });

      gsap.fromTo(
        imageElement,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
      );

      gsap.fromTo(
        contentElement,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    } else if (direction === "up") {
      gsap.to(imageElement, {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(contentElement, {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setDirection(""); 
        },
      });

      gsap.fromTo(
        imageElement,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
      );

      gsap.fromTo(
        contentElement,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    }
  }, [currentIndex, direction]);

  return (
    <div className="carousel-container" ref={carouselRef}>
      <div className="row">
        <div className="col-12 col-md-6 carousel-image">
          <img
            src={slides[currentIndex].image}
            alt="carousel"
            className="img-fluid"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-6 carousel-content d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2>{slides[currentIndex].content}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
