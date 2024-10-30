import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <>
      <div className="form">
        <h1>Send Message to Us!</h1>
        <form>
          <input type="text" placeholder="Write your Name" />
          <input type="email" placeholder="Write your Email" />
          <input type="text" placeholder="Write a Subject" />
          <textarea placeholder="Write a message" rows="4"></textarea>
          <button type="button">Send</button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
