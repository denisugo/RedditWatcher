import React from "react";
import ContentLoader from "react-content-loader";

function PostsLoader(props) {
  return (
    <ContentLoader
      speed={2}
      //   width={400}
      //   height={160}
      viewBox="0 0 400 260"
      backgroundColor="#cfcfcf"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* User */}
      <rect x="10" y="10" rx="3" ry="3" width="90" height="10" />
      {/* Date */}
      <rect x="15" y="25" rx="3" ry="3" width="50" height="8" />
      {/* Contents */}
      {/* Title */}
      <rect x="10" y="45" rx="3" ry="3" width="290" height="8" />
      {/* Image */}
      <rect x="10" y="60" rx="3" ry="3" width="380" height="180" />
    </ContentLoader>
  );
}

export default PostsLoader;
