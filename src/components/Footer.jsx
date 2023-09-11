import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="md:space-y-5 space-y-3">
      {/* news letter */}
      <div className="w-full bg-darkBlue text-white py-6">
        <div className="Container w-full flex flex-col lg:flex-row items-center justify-between md:gap-5 gap-2">
          <div className="space-y-2">
            <p className="font-semibold xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl">
              SUBSCRIBE TO OUR NEWSLETTER
            </p>
            <p className="font-medium md:text-lg text-sm">
              Sign up to receive email updates about courses
            </p>
          </div>
          <form className="flex items-center lg:w-fit gap-2 w-full justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white xl:w-80 lg:w-60 sm:w-1/2 w-full p-2 text-black outline-none focus:border-2 focus:border-green-500"
            />
            <button
              type="button"
              className="uppercase text-white bg-black text-center w-auto p-2"
            >
              subscribe
            </button>
          </form>
        </div>
      </div>
      {/* footer */}
      <div className="Container md:py-5 grid lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-5 gap-3">
        <div>
          <Link to="/">
            <img
              src={require("../assests/images/logo.png")}
              alt="logo"
              className="h-fit w-fit object-contain object-center"
            />
          </Link>
        </div>
        {/* shop */}
        <div className="w-full">
          <p className="font-semibold text-lg mb-4 relative uppercase">
            Shop
            <span className="bg-darkBlue w-14 absolute -bottom-1 left-0 h-0.5 rounded-lg" />
          </p>
          <ul className="font-medium ">
            <Link to="/">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Home
              </li>
            </Link>
            <Link to="/subscribe">
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Subscribe
              </li>
            </Link>
            <Link to="/shop">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Shop
              </li>
            </Link>
            <Link to="/magazines">
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Our Magazines
              </li>
            </Link>
            <Link to="/contact-us">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        {/* WOOD NETWORK NEWS MEDIA */}
        <div className="w-full">
          <p className="font-semibold text-lg mb-4 relative uppercase">
            WOOD NETWORK NEWS MEDIA
            <span className="bg-darkBlue w-14 absolute -bottom-1 left-0 h-0.5 rounded-lg" />
          </p>
          <ul className="font-medium ">
            <Link to="/">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Wood News Media
              </li>
            </Link>
            <Link to="/">
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Wood Mag
              </li>
            </Link>
            <Link to="/">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Craftsmen & Wood
              </li>
            </Link>
            <Link to="/">
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                The magazine designer
              </li>
            </Link>
            <Link to="/">
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                Magazine Roofing
              </li>
            </Link>
            <Link to="/">
              <li className="hover:border-l-4  my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                WoodPartners
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* copy right */}
      <div className="text-sm text-black text-center bg-lightGray p-2 font-semibold">
        Copyright © {new Date().getFullYear()} BOISNEWSMEDIA
      </div>
    </footer>
  );
};

export default Footer;
