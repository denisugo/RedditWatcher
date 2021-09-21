import React from "react";
import "./Logo.css";
import logo from "../../assets/logo128.png";

function Logo(props) {
  return (
    <div className="logo" data-testid="logo">
      <img alt="logo" src={logo} data-test="img" />
      <h1>
        <span>Reddit</span>Watcher
      </h1>
    </div>
  );
}

export default Logo;
