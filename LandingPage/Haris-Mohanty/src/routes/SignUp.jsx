import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import signup from "../Assets/122.jpg";
import Footer from "../components/Footer";
import Registration from "../components/Registration";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <Hero cName="hero-mid" heroImg={signup} title="SignUp" btnClass="hide" />
      <Registration />
      <Footer />
    </>
  );
};

export default SignUp;
