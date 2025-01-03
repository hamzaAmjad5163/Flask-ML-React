import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/header";
import About from "../components/about";
import Scanner from "../python-React/scanner";
import Carousel from "../components/carousel";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Scanner />
      <Carousel />
    </>
  );
};

export default HomePage;
