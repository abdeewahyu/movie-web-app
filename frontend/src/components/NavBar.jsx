import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">My Movie</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/Favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
};
<svg
  width="128"
  height="56"
  viewBox="0 0 128 56"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0 33.5V51C0 53.7614 2.23857 56 5 56H24.5L47 33.5H0ZM46 56H123C125.761 56 128 53.7614 128 51V5C128 2.23857 125.761 0 123 0H46L74 28L46 56ZM24.5 0H5C2.23857 0 0 2.23857 0 5V22.5H47L24.5 0ZM99 45C107.837 45 115 37.8365 115 29C115 20.1635 107.837 13 99 13C90.1635 13 83 20.1635 83 29C83 37.8365 90.1635 45 99 45Z"
    fill="#303030"
  />
</svg>;

export default NavBar;
