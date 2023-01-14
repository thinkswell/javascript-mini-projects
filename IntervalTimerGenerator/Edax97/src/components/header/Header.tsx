import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

export function Header() {
  return (
    <div className="header d-flex justify-content-center gap-3 my-3">
      <NavLink to="/programs">Programs</NavLink>
      <NavLink to="/new-program/">New</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
}
