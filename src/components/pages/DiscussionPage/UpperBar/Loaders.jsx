import React from "react";
import ContentLoader from "react-content-loader";

const Loaders = () => {
  return (
    <ContentLoader
      viewBox="0 0 260 50"
      backgroundOpacity={0.7}
      foregroundOpacity={0.6}
      style={{ height: "50px", width: "260px" }}
    >
      <circle cx="25" cy="25" r="25" />
      <rect x="60" y="12" width="200" height="22" rx="12" ry="12" />
    </ContentLoader>
  );
};

export default Loaders;
