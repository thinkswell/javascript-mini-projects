import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./about-page.scss";

export function AboutPage() {
  return (
    <div className="page-center">
      <div className="text-center">
        <h1 className="text-primary display-3">Interval Machine</h1>
        <p className="text-muted mt-3">@Edmar Campos 2022</p>

        <div className="d-flex justify-content-center gap-3 gap-lg-4">
          <a
            href="https://github.com/Edax97"
            aria-label="My github"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="about-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/edwin-edmar-campos-alarcon/"
            aria-label="My Linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="about-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
