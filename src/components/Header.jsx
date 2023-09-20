import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowSearch,
  handleChangeShowSignin,
  handleChangeShowSignup,
  handleLogoutFromAllTabs,
} from "../redux/globalStates";
import { handleLogout } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { GetUrl } from "../BaseUrl";
import { handleChangeActiveCategory } from "../redux/ShopSlice";

const Header = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state) => state.root.auth);

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
    if (openSidebar && window.innerWidth >= 1024) {
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
  }, [openSidebar, window.innerWidth]);

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
              className={`absolute z-10 -bottom-14 left-5 w-32 transition-all duration-100 ${
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
          {user === null ? (
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
          ) : (
            <div className="flex items-center gap-x-3">
              <Link to="/my-account" className="uppercase cursor-pointer">
                {user?.fname} {user?.lname}
              </Link>
              |
              <span
                className="uppercase cursor-pointer"
                onClick={() => {
                  toast.loading("Logout...");
                  setTimeout(() => {
                    toast.remove();
                    dispatch(handleLogout());
                    dispatch(handleLogoutFromAllTabs());
                  }, 2000);
                }}
              >
                Log out
              </span>
            </div>
          )}
        </div>
      </div>
      {/* second div */}
      <div className="shadow-lg">
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
            <Link
              to="/"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "home"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => setActiveLink("home")}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "shop"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => {
                setActiveLink("shop");
                dispatch(handleChangeActiveCategory("view_all"));
              }}
            >
              Shop
            </Link>
            <Link
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold text-sm cursor-pointer ${
                activeLink === "subscribe"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative group`}
              onClick={() => {
                setActiveLink("subscribe");
                dispatch(handleChangeActiveCategory("subscriptions"));
              }}
            >
              subscribe
              <div className="absolute group-hover:scale-100 z-10 whitespace-nowrap font-medium transition-all duration-300 origin-top-left scale-0 top-8 left-0 space-y-2 bg-white drop-shadow-2xl rounded-lg">
                <p className="p-3 hover:bg-darkGray hover:text-white transition-all duration-100">
                  BOISMAG SUBSCRIPTION
                </p>
                <p className="p-2 hover:bg-darkGray hover:text-white transition-all duration-100">
                  SUBSCRIPTION L’AGENCEUR MAGAZINE
                </p>
                <p className="p-2 hover:bg-darkGray hover:text-white transition-all duration-100">
                  ARTISANS & WOOD SUBSCRIPTION
                </p>
                <p className="p-3 hover:bg-darkGray hover:text-white transition-all duration-100">
                  SUBSCRIPTION ROOFING MAGAZINE
                </p>
              </div>
            </Link>
            <Link
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "buy_by_number"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => {
                setActiveLink("buy_by_number");
                dispatch(handleChangeActiveCategory("subscriptions"));
              }}
            >
              buy by number
            </Link>
            <Link
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "our_magazines"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => {
                setActiveLink("our_magazines");
                dispatch(handleChangeActiveCategory("magazines"));
              }}
            >
              our magazines
            </Link>
            <Link
              to="/contact-us"
              className={`uppercase transition-all 2xl:text-xl duration-100 active:scale-95 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "contact"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative`}
              onClick={() => setActiveLink("contact")}
            >
              contact
            </Link>
            |
            <p className="relative">
              {user !== null ? (
                <Link to="cart">
                  <AiOutlineShoppingCart size={25} />
                  <span className="absolute rounded-full -top-3 -right-2 min-w-[1rem] min-h-[1rem] text-sm w-auto h-auto bg-darkBlue text-white text-center ">
                    0
                  </span>
                </Link>
              ) : (
                <p onClick={() => dispatch(handleChangeShowSignin(true))}>
                  <AiOutlineShoppingCart role="button" size={25} />
                  <span className="absolute rounded-full -top-3 -right-2 min-w-[1rem] min-h-[1rem] text-sm w-auto h-auto bg-darkBlue text-white text-center ">
                    0
                  </span>
                </p>
              )}
            </p>
            {/* <Link to="search"> */}
            <AiOutlineSearch
              size={25}
              role="button"
              onClick={() => dispatch(handleChangeShowSearch(true))}
            />
            {/* </Link> */}
          </div>
          <HiOutlineBars3BottomRight
            size={30}
            className="cursor-pointer lg:hidden"
            onClick={() => setOpenSidebar(true)}
          />
        </div>
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
          <li
            className={`${
              activeLink === "home"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/"
              onClick={() => {
                setActiveLink("home");
                setOpenSidebar(false);
              }}
            >
              home
            </Link>
          </li>
          <li
            className={`${
              activeLink === "shop"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/shop"
              onClick={() => {
                setActiveLink("shop");
                setOpenSidebar(false);
                dispatch(handleChangeActiveCategory("view_all"));
              }}
            >
              shop
            </Link>
          </li>
          <li
            className={`${
              activeLink === "subscribe"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/shop"
              onClick={() => {
                setActiveLink("subscribe");
                setOpenSidebar(false);
                dispatch(handleChangeActiveCategory("subscriptions"));
              }}
            >
              subscribe
            </Link>
          </li>
          <li
            className={`${
              activeLink === "buy_by_number"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/shop"
              onClick={() => {
                setActiveLink("buy_by_number");
                setOpenSidebar(false);
                dispatch(handleChangeActiveCategory("magazines"));
              }}
            >
              buy by number
            </Link>
          </li>
          <li
            className={`${
              activeLink === "our_magazine"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/shop"
              onClick={() => {
                setActiveLink("our_magazine");
                setOpenSidebar(false);
                dispatch(handleChangeActiveCategory("magazines"));
              }}
            >
              our magazines
            </Link>
          </li>
          <li
            className={`${
              activeLink === "contact"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/contact-us"
              onClick={() => {
                setActiveLink("contact");
                setOpenSidebar(false);
              }}
            >
              contact
            </Link>
          </li>
          <li
            className={`${
              activeLink === "cart"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            {user === null ? (
              <span
                role="button"
                onClick={() => {
                  dispatch(handleChangeShowSignin(true));
                  setOpenSidebar(false);
                }}
              >
                cart
              </span>
            ) : (
              <Link
                to="/cart"
                onClick={() => {
                  setActiveLink("cart");
                  setOpenSidebar(false);
                }}
              >
                cart
              </Link>
            )}
          </li>
          <li
            className={`${
              activeLink === "search"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <Link
              to="/search"
              onClick={() => {
                setActiveLink("search");
                setOpenSidebar(false);
              }}
            >
              search
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
