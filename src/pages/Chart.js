import React from "react";
import Navbar from "../components/Navbar";
import StackOverflow from "../components/chart/stack-chart";
import Netflix from "../components/chart/netflix-chart";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <StackOverflow />
      <Netflix />
    </>
  );
};

export default ContactPage;
