
import Section1 from "./components/MainBody/Section1";
import Section2 from "./components/MainBody/Section2";
import Section3 from "./components/MainBody/Section3";
import LatestSchemes from "./components/LatestSchemes";

const MainBody = () => {
  return (
    <div className="flex-box">
      <Section1 />
      <Section2 />
      <Section3 />
      <LatestSchemes />
    </div>
  );
};

export default MainBody;
