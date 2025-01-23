import React from "react";
import { Link } from "react-router-dom";
import "./src/index.css";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WorkoutBuddy</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
