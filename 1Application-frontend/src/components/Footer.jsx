import { Fragment } from "react";
import "../css/Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn} from '@mui/icons-material'; // Import the shoes icon

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="section">
          <h2>Thinks Well Javascript Projects</h2>
          <div className="email-signup">
            <input type="email" placeholder="Enter Your Email" />
            <button>Get in touch with us & know us</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Get In Touch</li>
            <div className="social-icons">
              <Facebook />
              <Twitter />
              <Instagram />
              <LinkedIn />
            </div>
          </ul>
        </div>

        <div className="section">
          <h2>About Us</h2>
          <z>Our github</z>
          <z>Github stars</z>
          <z>Repositories</z>
        </div>

        <div className="section">
          <h2>License</h2>
          <ul>
            <li>MIT License</li>
            <li>Code of Conduct</li>
            <li>Contributors</li>
          </ul>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
