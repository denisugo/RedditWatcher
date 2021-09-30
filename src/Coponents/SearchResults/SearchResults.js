import React from "react";
import icons from "../../assets/subredditsIcons";
import SearchResult from "../SearchResult/SearchResult";
import "./SearchResults.css";

function SearchResults({ searchResults, onSelect }) {
  return (
    <div className="search-results" data-testid="search-results">
      {searchResults.map((searchResult) => {
        const icon = searchResult.data.icon_img
          ? searchResult.data.icon_img
          : icons.home;
        return (
          <SearchResult
            key={searchResult.data.id}
            icon={icon}
            name={searchResult.data.display_name_prefixed}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}

export default SearchResults;
