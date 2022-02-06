import React from "react";
import ContentLoader from "react-content-loader";

const Loaders = () => {
  return (
    <>
      <ContentLoader
        backgroundOpacity={0.7}
        foregroundOpacity={0.6}
        viewBox="0 0 296 73"
        style={{ maxHeight: "73px", maxWidth: "100%" }}
        className="mb-0"
      >
        <circle cx="40.5" cy="40.5" r="32.5" />
        <rect x="81" y="28.4" rx="12" ry="12" width="215" height="24" />
      </ContentLoader>
      <ContentLoader
        backgroundOpacity={0.7}
        foregroundOpacity={0.6}
        viewBox="0 0 296 73"
        style={{ maxHeight: "73px", maxWidth: "100%" }}
      >
        <circle cx="40.5" cy="40.5" r="32.5" />
        <rect x="81" y="28.4" rx="12" ry="12" width="215" height="24" />
      </ContentLoader>
    </>
  );
};

export default Loaders;
