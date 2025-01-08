import React from "react";
import { Link } from "react-router-dom";
import blueLogo from "../assets/blueLogo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: "9999" }} >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={blueLogo}
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/technology">
                Technology Used
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chart">
                Stack Overflow States
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calculator">
                Calculator
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
