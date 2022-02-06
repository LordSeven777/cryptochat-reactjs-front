import React, { useEffect } from "react";
import "./style.scss";

const PhotoModal = ({ show, imageURL, caption, onClose }) => {
  useEffect(() => {
    const { documentElement } = document;
    if (show) documentElement.style.overflow = "hidden";
    else documentElement.style.overflow = "auto";
    return () => {
      if (show) documentElement.style.overflow = "auto";
    };
  }, [show]);

  return (
    show && (
      <div className="photo-modal d-flex justify-content-center align-items-center">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageURL} alt={caption} />
      </div>
    )
  );
};

export default React.memo(PhotoModal);
