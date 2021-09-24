import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [border, setBorder] = useState("none");

  const onMouseEnterHandler = ({ currentTarget }) => {
    // currentTarget.style.border = "3px solid #706F6F";
    setBorder("3px solid #706F6F");
  };
  const onMouseLeaveHandler = ({ currentTarget }) => {
    // currentTarget.style.border = "none";
    setBorder("none");
  };
  return (
    <div
      className="search-bar"
      data-testid="search-bar"
      style={{ border: border }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <FontAwesomeIcon icon={faSearch} size={"2x"} color="#706F6F" />
      <input type="search" name="term" placeholder="Search" role="search" />
    </div>
  );
}

export default SearchBar;
