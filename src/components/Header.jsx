import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleChangeShowSignin,
  handleChangeShowSignup,
} from "../redux/globalStates";

const Header = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [openSidebar, setOpenSidebar] = useState(false);

  const dropDownRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event?.target) &&
        showDropdown
      ) {
        setshowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showDropdown]);

  function handleClickOutside() {
    setshowDropdown(false);
  }

  useEffect(() => {
    if (openSidebar && window.screen.width >= 1024) {
      setOpenSidebar(false);
    }
    if (openSidebar) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "unset";
    }
    window.addEventListener("resize", () => {
      if (window.screen.width >= 1024) {
        setOpenSidebar(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [openSidebar, window.screen.width]);

  const links = [
    { title: "home", link: "/" },
    { title: "shop", link: "/shop" },
    { title: "subscribe", link: "/subscribe" },
    { title: "buy by number", link: "/buy-by-number" },
    { title: "our magazines", link: "/magazines" },
    { title: "contact", link: "/contact-us" },
    { title: "cart", link: "/cart" },
    { title: "search", link: "/search" },
  ];

  return (
    <header>
      {/* fist div */}
      <div className="bg-darkBlue w-full text-white md:py-4 py-2">
        <div className="Container w-full flex items-center justify-between md:text-base text-sm">
          <div className=" uppercase relative select-none ">
            <p
              className="cursor-pointer"
              onClick={() => {
                setshowDropdown(!showDropdown);
              }}
            >
              eng{" "}
              <BsChevronDown
                className={`inline-block ml-1 ${
                  showDropdown ? "rotate-180" : "rotate-0"
                } transition-all duration-100`}
                size={15}
              />
            </p>
            <div
              ref={dropDownRef}
              className={`absolute z-10 -bottom-12 left-5 w-24 transition-all duration-100 ${
                showDropdown ? "scale-100" : "scale-0"
              } origin-top-left p-1 space-y-1 rounded-lg drop-shadow-xl shadow-xl bg-white text-black`}
            >
              <p className="cursor-pointer pl-2 hover:bg-gray-200 hover:font-semibold">
                eng
              </p>
              <p className="cursor-pointer pl-2 hover:bg-gray-200 hover:font-semibold">
                fr
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <span
              className="uppercase cursor-pointer"
              onClick={() => {
                dispatch(handleChangeShowSignup(true));
              }}
            >
              Register
            </span>{" "}
            |{" "}
            <span
              className="uppercase cursor-pointer"
              onClick={() => {
                dispatch(handleChangeShowSignin(true));
              }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
      {/* second div */}
      <div className="Container w-full flex justify-between items-center md:py-3 py-1">
        <Link to="/">
          <img
            src={require("../assests/images/logo.png")}
            alt="logo"
            className="md:w-fit md:h-fit h-16 w-16 object-contain object-center"
          />
        </Link>
        {/* links for desktop */}
        <div className="lg:flex items-center lg:gap-x-5 gap-x-2 select-none hidden">
          {links.slice(0, -2).map((link) => (
            <Link
              key={link.title}
              to={link.link}
              className={`uppercase transition-all 2xl:text-xl hover:scale-105 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === link.title
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => setActiveLink(link.title)}
            >
              {link.title}
            </Link>
          ))}
          |
          <p className="relative">
            <Link to="cart">
              <AiOutlineShoppingCart size={25} />
              <span className="absolute rounded-full -top-3 -right-2 min-w-[1rem] min-h-[1rem] text-sm w-auto h-auto bg-darkBlue text-white text-center ">
                0
              </span>
            </Link>
          </p>
          <Link to="search">
            <AiOutlineSearch size={25} />
          </Link>
        </div>
        <HiOutlineBars3BottomRight
          size={30}
          className="cursor-pointer lg:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>
      {/* mobile sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 p-2 transition-all origin-top-right duration-300 min-h-screen max-h-screen w-screen bg-white text-black ${
          openSidebar ? "scale-100" : "scale-0"
        }`}
      >
        <AiOutlineClose
          size={30}
          className="cursor-pointer ml-auto"
          onClick={() => setOpenSidebar(false)}
        />
        <ul className="md:w-1/2 w-full mx-auto space-y-5 px-10">
          {links.map((link) => (
            <li
              key={link.title}
              className={`${
                activeLink === link.title
                  ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                  : "bg-none font-medium"
              } uppercase transition-all duration-300`}
            >
              <Link
                to={link.link}
                onClick={() => {
                  setActiveLink(link.title);
                  setOpenSidebar(false);
                }}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
