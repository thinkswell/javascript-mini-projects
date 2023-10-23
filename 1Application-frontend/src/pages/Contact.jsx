import { Fragment } from "react";
import "../css/Contact.css";
import { Email, Phone, Store } from "@mui/icons-material";

const Contact = () => {
  return (
    <Fragment>
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-heading">Contact Us</h1>
          <h6 className="contact-paragraph">
            Thinkswell's JavaScript mini project is a remarkable repository with
            a rich history spanning two years. It has grown with the collective
            effort of numerous dedicated contributors who have continually
            enhanced its various projects. This repository stands as a testament
            to collaboration, innovation, and the power of an open-source
            community. With each passing year, Thinkswell's mini project
            repository has evolved, introducing a multitude of innovative
            features, bug fixes, and improvements. The project's longevity is a
            testament to its enduring relevance and the commitment of its
            contributors. The collective effort of contributors has not only
            refined existing projects but also spawned new ones, expanding the
            repository's scope and utility. It has become a hub for JavaScript
            enthusiasts, fostering creativity and problem-solving in a
            collaborative environment.
          </h6>

          <h2 className="contact-subheading">Reach Us</h2>
          <h6 className="contact-paragraph">
            Github: https://github.com/thinkswell/javascript-mini-projects
            <br />
            Website Link: https://thinkswelljsproject.vercel.app
          </h6>

          <h2 className="contact-subheading">Be A Contributor</h2>
          <h6 className="contact-paragraph">
          Become a valued contributor to Thinkswell's JavaScript mini project repository. Join our passionate community, share your expertise, and make a lasting impact. Your contributions will shape the future of our projects and help us continue to grow and innovate. Start your journey with us today!
          </h6>

          <h2 className="contact-heading">Social Media</h2>
          <h6 className="contact-paragraph">
            "At Thinkswell, we're embarking on an exciting journey filled with innovation and passion for JavaScript. Our social media channels are your gateway to a world of coding excellence. We share the latest developments, expert tutorials, and a thriving community of like-minded enthusiasts. Whether you're an experienced developer or just beginning your coding adventure, Thinkswell has something for you. Join us on this captivating path of open source exploration and stay tuned for updates that will inspire and empower your JavaScript endeavors."
          </h6>

          <div className="social-icons">
            <Email
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
            <Phone
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
            <Store
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>
        </div>

        <div className="contact-form">
          <h2 className="contact-subheading">Contact Form</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Good Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="Number"
                id="email"
                name="email"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                style={{
                  padding: "10px 35px 10px 35px",
                  border: "2px solid white",
                  borderRadius: "8px",
                  backgroundColor: "rgb(255, 210, 255)",
                }}
                id="message"
                name="message"
                placeholder="Your Message"
                rows="3"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
