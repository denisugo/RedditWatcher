import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import icons from "../../assets/subredditsIcons";
import SearchResults from "../SearchResults/SearchResults";

function SearchBar(props) {
  // Styling
  const [border, setBorder] = useState("none");

  const onMouseEnterHandler = ({ currentTarget }) => {
    setBorder("3px solid #706F6F");
  };
  const onMouseLeaveHandler = ({ currentTarget }) => {
    setBorder("none");
  };

  // Search term logic
  // Mock results
  const results = [
    {
      id: 0,
      name: "result-result",
      subscribers: 20,
      icon: icons.blender,
    },
    {
      id: 1,
      name: "result-result",
      subscribers: 20,
      icon: icons.art,
    },
    {
      id: 2,
      name: "result-result",
      subscribers: 20,
      icon: icons.news,
    },
  ];
  const [resultsVisible, setResultsVisible] = useState(false);
  const handleClick = () => {
    setResultsVisible(true);
  };
  const handleBlur = () => {
    setResultsVisible(false);
  };
  return (
    <div
      className="search-bar"
      data-testid="search-bar"
      style={{ border: border }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      tabIndex="0"
      onFocus={handleClick}
      onBlur={handleBlur}
    >
      <FontAwesomeIcon icon={faSearch} size={"2x"} color="#706F6F" />
      <input
        data-testid="search-input"
        type="search"
        name="term"
        placeholder="Search"
        role="search"
      />
      {resultsVisible && <SearchResults searchResults={results} />}
    </div>
  );
}

export default SearchBar;
