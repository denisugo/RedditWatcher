import React from "react";

function SearchBar(props) {
  return (
    <div className="search-bar" data-test="search-bar">
      <input type="text" name="term" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
