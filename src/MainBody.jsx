import React from "react";
import Section1 from "./components/MainBody/section1";
import Section2 from "./components/MainBody/Section2";
import Section3 from "./components/MainBody/Section3";
const MainBody = () => {
  return (
    <>
      <div className="flex-box">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </>
  );
};

export default MainBody;
