import React, { useEffect, useRef } from "react";

// You can place these SVG components in a separate file or keep them here
const IconForm = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const IconSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const IconBenefit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0 1v.01M12 18v-1m0-1v-1m0-1V4m0 16v-1m0-1v-1m0-1V4m0 16v-1"
    />
  </svg>
);

const Section3 = () => {
  const steps = [
    {
      icon: <IconForm />,
      title: "Fill Your Details",
      description:
        "Provide some basic information like your profession, age, and state so we can find schemes relevant to you.",
    },
    {
      icon: <IconSearch />,
      title: "Get Matched",
      description:
        "Our smart algorithm instantly filters through hundreds of schemes to find the ones you are eligible for.",
    },
    {
      icon: <IconBenefit />,
      title: "Apply & Benefit",
      description:
        "Review the scheme details, understand the benefits, and get guidance on how to apply directly.",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if GSAP and ScrollTrigger are loaded from the CDN
    if (window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);

      const el = sectionRef.current;

      // Animate the title when it enters the viewport
      gsap.from(el.querySelector("h2"), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // Starts animation when 80% of the section is in view
        },
      });

      // Animate the step cards with a stagger effect
      gsap.from(gsap.utils.toArray(".step-card"), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2, // Adds a 0.2s delay between each card's animation
        scrollTrigger: {
          trigger: el.querySelector(".steps-container"),
          start: "top 80%",
        },
      });

      // Add hover animations to each card
      const cards = gsap.utils.toArray(".step-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24  bg-amber-50 overflow-hidden"
    >
      <div className="container h-130 mx-23 px-6">
        {/* Section Title */}
        <h2 className="text-[35px] -ml-5 pt-13 flex-box -space-x-10  font-light text-center text-gray-800">
          How It Works in <br />
        </h2>
        <h2 className="flex-box text-blue-600 font-stretch-125% -mt-35 ml-110 text-[40px]">
          <span className="text-[150px] -ml-16 -mt-12">3</span>{" "}
        </h2>
        <h2 className="text-[33px] font-stretch-125% text-blue-500 align-text-top ml-121 -mt-26 ">
          Simple Steps
        </h2>
        {/* Steps Container */}
        <div className="steps-container mt-10 -ml-10 relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card relative z-10 flex flex-col items-center text-center max-w-sm"
            >
              <div className="flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full mb-4 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
