import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import contactImg from "../Assets/2.png";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={contactImg}
        title="Contact"
        btnClass="hide"
      />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Contact;
