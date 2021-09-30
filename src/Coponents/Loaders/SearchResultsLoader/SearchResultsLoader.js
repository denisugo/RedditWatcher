import React from "react";
import ContentLoader from "react-content-loader";

function SearchResultsLoader(props) {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={40}
      viewBox="0 0 300 40"
      backgroundColor="#cfcfcf"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* Icon */}
      <circle cx="30" cy="20" r="15" />
      {/* Name */}
      <rect x="55" y="13" rx="2" ry="2" width="90" height="14" />
    </ContentLoader>
  );
}

export default SearchResultsLoader;
