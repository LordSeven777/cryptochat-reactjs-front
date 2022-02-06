import React, { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const TestPage = () => {
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    frameRef.current.onscroll = () => {
      if (
        frameRef.current.offsetHeight + frameRef.current.scrollTop >=
        wrapperRef.current.offsetHeight
      )
        alert("Banzaii!");
    };
  }, []);

  return (
    <div className="bg-dark">
      <SimpleBar
        style={{ width: "300px", height: "100px", overflow: "auto" }}
        scrollableNodeProps={{ ref: frameRef }}
      >
        <p ref={wrapperRef}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aut ad pariatur
          consectetur aliquam dolorum, fugit perspiciatis natus delectus! Nulla? Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Aperiam voluptatum recusandae repudiandae illo aut
          a dicta adipisci inventore eos accusantium! Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Voluptatem odio cupiditate, quod consectetur exercitationem dicta cumque
          veniam eius nulla qui!
        </p>
      </SimpleBar>
    </div>
  );
};

export default TestPage;
