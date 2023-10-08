import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import serviceImg from "../Assets/1.png";
import Footer from "../components/Footer";
import Tour from "../components/Tour";

const Service = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={serviceImg}
        title="Service"
        btnClass="hide"
      />
      <Tour />
      <Footer />
    </>
  );
};

export default Service;
