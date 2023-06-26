import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
      <header className="py-4 px-1 sticky-top bg-white">
        <nav className="d-flex">
        <div className="col-2">
          <Link to={"/"} className="nav-link"> Home </Link>
        </div>
        <div className="d-flex col-10 justify-content-evenly">
          <Link to={"apod"} className="nav-link"> APOD </Link>
          <Link to={"/asteroids"} className="nav-link">Asteroids</Link>
          <Link to={"/epic"} className="nav-link">EPIC </Link>
        </div>
        </nav>
      </header>
  );
}

export default Navbar;
