import React from "react";
import ContentLoader from "react-content-loader";

function CommentsLoader(props) {
  return (
    <ContentLoader
      speed={2}
      //   width={400}
      //   height={160}
      viewBox="0 0 400 90"
      backgroundColor="#cfcfcf"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* User */}
      <rect x="10" y="10" rx="3" ry="3" width="90" height="10" />
      {/* Date */}
      <rect x="350" y="20" rx="3" ry="3" width="50" height="8" />
      {/* Contents */}
      <rect x="10" y="36" rx="3" ry="3" width="390" height="8" />
      <rect x="10" y="52" rx="3" ry="3" width="380" height="8" />
      <rect x="10" y="68" rx="3" ry="3" width="178" height="8" />
    </ContentLoader>
  );
}

export default CommentsLoader;
