import React from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";

function Navbar({ watchLaterCount, darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        Mini YouTube
      </Link>

      <div className="ms-auto d-flex align-items-center gap-2">
        <input type="text" className="form-control form-control-sm" placeholder="Search..." />
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
        <Link to="/watch-later" className="btn btn-sm btn-outline-light position-relative">
          Watch Later
          <span className="badge bg-light text-dark ms-1">{watchLaterCount}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
