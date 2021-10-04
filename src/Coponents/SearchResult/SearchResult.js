import React, { useState } from "react";
import "./SearchResult.css";
import { Link } from "react-router-dom";

function SearchResult({ icon, name, onSelect }) {
  const [style, setStyle] = useState("default");

  const handleMouseEnter = () => setStyle("hovered");
  const handleMouseLeave = () => setStyle("default");

  return (
    <Link
      to="/"
      className={`search-result search-result-${style}`}
      data-testid="search-result"
      role="button"
      tabIndex="0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        e.target.focus();
        onSelect(name);
      }}
    >
      <img src={icon} alt="Icon" tabIndex="0" />
      <h3 tabIndex="0">{name}</h3>
    </Link>
  );
}

export default SearchResult;
