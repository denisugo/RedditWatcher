import React from "react";
import "./Header.css";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";

function Header(props) {
  return (
    <div className="header" data-test="header">
      <Logo />
      <SearchBar />
    </div>
  );
}

export default Header;
