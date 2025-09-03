import React from "react";
import FeaturesCard from "../Card/FeaturesCard";

const Section2 = () => {
  return (
    <>
      <div className="h-screen -mt-5 pl-20 overflow-hidden  bg-amber-50">
        <div className="flexbox h-100 w-150 pt-40 pl-10">
          <h1 className="relative text-[150px]">
            Why <br />
            <h2 className="font-stretch-125% -mt-8 ml-6 hover:text-blue-700  text-4xl text-blue-500">
              Yojana Finder
            </h2>
            <p className="absolute font-stretch-125% text-black h-70 w-50 -top-25 ml-58 text-[290px] ">
              ?
            </p>
          </h1>
        </div>
        <div className="flex z-100 -mt-105 ml-135 h-full w-200">
          <FeaturesCard />
        </div>
      </div>
    </>
  );
};

export default Section2;
