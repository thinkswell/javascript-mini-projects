import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom"; 
import "../css/Navbar.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Fragment>
      <nav>
        <div className={`main-component ${menuOpen ? "menu-open show" : ""}`}>
          <div className="head-main">
            <h3 className="row" style={{ marginTop: "0.8rem" }}>
              Thinks Well
            </h3>
            <h3 className="row">
              JAVASCRIPT PROJECTS
            </h3>
          </div>
          <div className="routes">
            <ul className={`navbar_list ${menuOpen ? "menu-opens" : ""}`}>
              <li style={{ color: "rgb(41, 6, 241)" }}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/projects">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/team">Tech Team</NavLink>
              </li>
              <li><NavLink to="/profile"><AccountBoxIcon
                className="btn1"
                style={{ color: "rgb(41, 6, 241)" }}
              /></NavLink></li>
            </ul>
            <div className="button" onClick={toggleMenu}>
              {menuOpen ? (
                <CloseIcon
                className="icon1"
                  style={{ fontSize: "2rem", color: "rgb(70, 11, 70)" }}
                />
              ) : (
                <MenuIcon
                  style={{
                    fontSize: "2rem",
                    color: "rgb(70, 11, 70)",
                    zIndex: "-1",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
