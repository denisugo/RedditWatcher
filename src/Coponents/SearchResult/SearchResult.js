import React, { useState } from "react";
import "./SearchResult.css";

function SearchResult({ icon, name }) {
  const [style, setStyle] = useState("default");

  const handleMouseEnter = () => setStyle("hovered");
  const handleMouseLeave = () => setStyle("default");

  return (
    <div
      className={`search-result search-result-${style}`}
      role="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <img src={icon} alt="Icon" />
      <h3>{name}</h3>
    </div>
  );
}

export default SearchResult;
