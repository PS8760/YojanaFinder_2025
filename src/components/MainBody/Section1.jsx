import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { gsap } from "gsap";

let Section1 = () => {
  let animeRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".anime", {
        y: 20,
        opacity: 0,
        ease: "power2.out",
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: animeRef }
  );

  return (
    <>
      <div
        ref={animeRef}
        className=" h-145 mt-2 w-screen pt-0 pl-17 bg-amber-50"
      >
        <div className="anime">
          <h1 className="relative justify-center font-light align-middle pt-20 text-8xl text-blue-500">
            Connecting Every Indian to Their
            <div className="anime flex pl-105">Opportunity</div>
            <div className="anime relative h-18 w-190 text-center text-4xl mt-10 ml-70 px-4 py-4 rounded-[32px] bg-gradient-to-r from-blue-500 to-cyan-500 ">
              <p className="text-amber-50">
                Government benefits, simplified for everyone
              </p>
            </div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Section1;
