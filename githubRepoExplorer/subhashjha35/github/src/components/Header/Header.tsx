import React from "react";
import "./Header.scss";
import logo from "../../assets/main-logo.png";
const Header: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand m-lg-10">
          <a href="/">
            <img src={logo} alt="logo" className="navbar-logo" />
            <span>Github Repo Finder</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
