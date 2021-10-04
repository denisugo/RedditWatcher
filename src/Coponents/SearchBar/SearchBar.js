import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchResults from "../SearchResults/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  selectSearchError,
  selectSearchLoading,
  selectSearchResults,
} from "../../features/SearchSlice/SeacrhSlice";
import SearchResultsLoader from "../Loaders/SearchResultsLoader/SearchResultsLoader";
import { fetchPosts } from "../../features/PostsSlice/PostsSlice";
import { changeSubreddit } from "../../features/SubredditsSlice/SubredditsSlice";
import subreddits from "../../features/SubredditsSlice/SubredditsData";
import SearchBarMobileSubreddits from "../SearchBarMobileSubreddits/SearchBarMobileSubreddits";

function SearchBar(props) {
  // Styling
  const [border, setBorder] = useState("none");

  const onMouseEnterHandler = () => {
    setBorder("3px solid #E09E43");
  };
  const onMouseLeaveHandler = () => {
    setBorder("none");
  };

  // Search term logic
  // Load results
  const searchResults = useSelector(selectSearchResults);
  const loading = useSelector(selectSearchLoading);
  // const error = useSelector(selectSearchError);

  const dispatch = useDispatch();

  const [term, setTerm] = useState("");

  const handleChange = ({ target }) => {
    setTerm(target.value);
    // await new Promise((resolve) => setImmediate(resolve));
    dispatch(fetchSearchResults(target.value));
  };

  const [resultsVisible, setResultsVisible] = useState(false);

  const handleFocus = (e) => {
    setResultsVisible(true);
  };
  const handleBlur = (e) => {
    setResultsVisible(false);
  };

  // Select search result
  const handleSelect = (subreddit) => {
    dispatch(fetchPosts(subreddit));
    dispatch(changeSubreddit(subreddit));
    setResultsVisible(false);
    setBorder("none");
    setTerm("");
  };
  return (
    <div
      className="search-bar"
      data-testid="search-bar"
      style={{ border: border }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      tabIndex="0"
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <FontAwesomeIcon
        icon={faSearch}
        size={"2x"}
        color="#706F6F"
        className="magnifier"
      />

      <input
        data-testid="search-input"
        type="search"
        name="term"
        placeholder="Search"
        autoComplete="off"
        role="search"
        value={term}
        onChange={handleChange}
      />
      <div className="search-results-and-subreddits">
        {!loading && resultsVisible && (
          <SearchResults
            searchResults={searchResults}
            onSelect={handleSelect}
          />
        )}
        {!loading && resultsVisible && (
          <SearchBarMobileSubreddits onSelect={handleSelect} />
        )}
      </div>

      {resultsVisible && loading && (
        <div className="mock-search-results" data-testid="mock-search-results">
          <SearchResultsLoader />
          <SearchResultsLoader />
          <SearchResultsLoader />
          <SearchResultsLoader />
          <SearchResultsLoader />
        </div>
      )}
      {/* {resultsVisible && error && (
        <div className="search-error" data-testid="search-error">
          <em>Unable to load results</em>
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
