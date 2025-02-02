import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* "Real Estate Portal" as a clickable link */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-home-link">Real Estate Portal</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/builder-login">Builder Login</Link>
        </li>
        <li>
          <Link to="/builder-signup">Builder SignUp</Link>
        </li>
        <li>
          <Link to="/expert-login">Expert Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
