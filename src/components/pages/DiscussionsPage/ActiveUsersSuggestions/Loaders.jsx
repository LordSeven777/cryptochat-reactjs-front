import React from "react";
import ContentLoader from "react-content-loader";

const Loaders = () => {
  // avatar: 50 * 50
  // mb: 8
  // user name: 77 * 32
  // Container: 90 * 106 _ p: 8
  return (
    <ContentLoader
      backgroundOpacity={0.7}
      foregroundOpacity={0.6}
      style={{ width: "90px", height: "106px" }}
    >
      <circle cx="45" cy="33" r="25" />
      <rect x="13.5" y="66" width="63" height="13" rx="7" ry="7" />
      <rect x="6.5" y="83" width="77" height="13" rx="7" ry="7" />
    </ContentLoader>
  );
};

export default Loaders;
