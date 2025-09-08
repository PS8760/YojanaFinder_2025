import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
const Navbar = () => {
  const navRef = useRef();

  useEffect(
    () => {
      if (window.gsap) {
        const gsap = window.gsap;

        const links = gsap.utils.toArray(".nav-link", navRef.current);

        links.forEach((link) => {
          const underline = link.querySelector(".underline");

          link.addEventListener("mouseenter", () => {
            gsap.to(underline, {
              width: "100%",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          link.addEventListener("mouseleave", () => {
            gsap.to(underline, {
              width: "0%",
              duration: 0.3,
              ease: "power2.inOut",
            });
          });
        });
      }
    },
    { scope: navRef }
  );

  return (
    <>
      <div className="ml-17 mt-6 h-20 w-315 flex p-3 bg-gray-800 rounded-3xl">
        <div className=" h-10 w-full text-3xl pl-4 pt-2 justify-center font-stretch-125%  items-center text-blue-500 duration-300 ">
          <h1 className=" hover:text-blue-700 w-53 bg-transparent">
            Yojana Finder
          </h1>
        </div>
        <div
          ref={navRef}
          className="nav-link flex align-middle mr-12 text-center text-xl space-x-12 pt-3"
        >
          <Link
            to="/"
            className="nav-link relative h-8.5 font-stretch-125% text-blue-500   transition-colors duration-300 "
          >
            Home
            <span className="underline absolute h-0.5 w-0 bottom-0 left-0 bg-blue-700"></span>
          </Link>
          <Link
            to="/schemes"
            className="nav-link relative h-8.5 font-stretch-125% text-blue-500  transition-colors duration-300"
          >
            Schemes
            <span className="underline absolute h-0.5 w-0 bottom-0 left-0 bg-blue-700"></span>
          </Link>
          <Link
            to="/aboutus"
            className="nav-link relative h-8.5 font-stretch-125% text-blue-500  w-25 transition-colors duration-300"
          >
            About Us
            <span className="underline absolute h-0.5 w-0 bottom-0 left-0 bg-blue-700"></span>
          </Link>
          <Link
            to="/contact"
            className="nav-link relative h-8.5 font-stretch-125% text-blue-500 transition-colors duration-300"
          >
            Contact
            <span className="underline absolute h-0.5 w-0 bottom-0 left-0 bg-blue-700"></span>
          </Link>
          <Link
            to="/login"
            className="nav-link relative h-8.5 font-stretch-125% text-blue-500 transition-colors duration-300"
          >
            Login/Register
            <span className="underline absolute h-0.5 w-0 bottom-0 left-0 bg-blue-700"></span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
