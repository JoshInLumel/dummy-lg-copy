import React from "react";
import dyteLogo from "../assets/dyteLogo.svg";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="nav-bar-container">
        <a href="https://dyte.io/">
          <img src={dyteLogo} alt="Logo" />
        </a>
        <div className="title">LOGS VIEWER</div>
      </div>
    </>
  );
};

export default NavBar;
