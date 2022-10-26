import React from "react";
import Button from "./Button";
import { useLocation  } from "react-router-dom";

const Header = ({ title, text, onClick, add }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button color={add ? "red" : "green"} text={text} onClick={onClick} />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
