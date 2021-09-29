import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import "./SearchResults.css";

function SearchResults({ searchResults }) {
  return (
    <div className="search-results" data-testid="search-results">
      {searchResults.map((searchResult) => {
        return (
          <SearchResult
            key={searchResult.id}
            icon={searchResult.icon}
            name={searchResult.name}
          />
        );
      })}
    </div>
  );
}

export default SearchResults;
