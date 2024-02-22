import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineDown,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowSearch,
  handleChangeShowSignin,
  handleChangeShowSignup,
  handleChangeUserLanguage,
  handleLogoutFromAllTabs,
} from "../redux/globalStates";
import { handleLogout } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  handleChangeActiveCategory,
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../redux/ShopSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [dropDownList, setDropDownList] = useState("buy_by_number");

  const { user } = useSelector((state) => state.root.auth);
  const { userLanguage } = useSelector((state) => state.root.globalStates);
  const { cart } = useSelector((state) => state.root.cart);
  const { subscriptions, subscriptionLoading } = useSelector(
    (state) => state.root.shop
  );

  const dropDownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlechangelanguage = (value) => {
    if (value === "en") {
      window.localStorage.setItem("lang", JSON.stringify("en"));
      dispatch(handleChangeUserLanguage("en"));
      window.location.reload();
    } else {
      window.localStorage.setItem("lang", JSON.stringify("fr"));
      dispatch(handleChangeUserLanguage("fr"));
      window.location.reload();
    }
  };

  const handleOnClick = (category) => {
    dispatch(handleChangeActiveCategory(category));
    dispatch(handleChangeMagazineOrSubscriptionShow(false));
    setDropDownList("");
    setOpenSidebar(false);
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnClickForSubscription = (id) => {
    dispatch(handleChangeMagazineOrSubscriptionShow(true));
    dispatch(
      handleChangeSingleMagazineOrSubscription({
        id,
        type: "subscription",
      })
    );
    setOpenSidebar(false);
    setTimeout(() => {
      navigate("/shop");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  function handleClickOutside() {
    setshowDropdown(false);
  }

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

  // for auto close when screen size > tablet
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

  useEffect(() => {
    if (location.pathname.includes("shop")) {
      setActiveLink("shop");
    } else if (location.pathname === "/") {
      setActiveLink("home");
    } else if (location.pathname.includes("contact")) {
      setActiveLink("contact");
    } else if (
      !window.location.href.includes("contact") ||
      !window.location.href.includes("/") ||
      !window.location.href.includes("shop")
    ) {
      setActiveLink("");
    }
  }, [location]);

  return (
    <header className="sticky top-0 bg-white w-full z-30">
      {/* fist div */}
      <div className="bg-darkBlue w-full text-white md:py-4 py-2">
        <div className="Container w-full flex items-center justify-between md:text-base text-sm">
          {/* left side */}
          <div className=" uppercase relative select-none ">
            <p
              className="cursor-pointer uppercase"
              onClick={() => {
                setshowDropdown(!showDropdown);
              }}
            >
              {userLanguage}{" "}
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
              <p
                onClick={() => handlechangelanguage("en")}
                className="cursor-pointer pl-2 hover:bg-gray-200 hover:font-semibold"
              >
                eng
              </p>
              <p
                onClick={() => handlechangelanguage("fr")}
                className="cursor-pointer pl-2 hover:bg-gray-200 hover:font-semibold"
              >
                fr
              </p>
            </div>
          </div>
          {user === undefined || user === null ? (
            <div className="flex items-center gap-x-3">
              <span
                className="uppercase cursor-pointer"
                onClick={() => {
                  dispatch(handleChangeShowSignup(true));
                }}
              >
                {t("register")}
              </span>{" "}
              |{" "}
              <span
                className="uppercase cursor-pointer"
                onClick={() => {
                  dispatch(handleChangeShowSignin(true));
                }}
              >
                {t("login")}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-x-3">
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/my-account"
                className="uppercase cursor-pointer"
              >
                {t("My Account")}
              </Link>
              |
              <span
                className="uppercase cursor-pointer"
                onClick={() => {
                  toast.loading(t("Logout").concat("..."));
                  setTimeout(() => {
                    toast.remove();
                    dispatch(handleLogout());
                    dispatch(handleLogoutFromAllTabs());
                  }, 2000);
                }}
              >
                {t("logout")}
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
            {/* home */}
            <Link
              to="/"
              className={`uppercase transition-all 2xl:text-xl duration-100 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "home"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => setActiveLink("home")}
            >
              {t("home")}
            </Link>
            {/* shop */}
            <Link
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "shop"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } `}
              onClick={() => {
                setActiveLink("shop");
                dispatch(handleChangeActiveCategory("view_all"));
                dispatch(handleChangeMagazineOrSubscriptionShow(null));
              }}
            >
              {t("shop")}
            </Link>
            {/* subscribe */}
            <div
              className={`uppercase transition-all hover:bg-gray-200 hover:p-1 2xl:text-xl duration-100 hover:font-semibold text-sm cursor-pointer ${
                activeLink === "subscribe"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative group`}
              onClick={() => {
                // dispatch(handleChangeActiveCategory("subscriptions"));
              }}
            >
              <span
              // onClick={() =>
              //   dispatch(handleChangeMagazineOrSubscriptionShow(false))
              // }
              >
                {t("subscribe")}
              </span>
              {!subscriptionLoading && subscriptions?.length > 0 && (
                <div className="absolute group-hover:scale-100 z-10 whitespace-nowrap font-medium transition-all duration-300 origin-top-left scale-0 top-8 left-0 space-y-2 bg-white drop-shadow-2xl rounded-lg">
                  {subscriptions?.map((subscription) => (
                    <Link
                      key={subscription?._id}
                      to={`/shop/subscription/${subscription?._id}`}
                    >
                      <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                        {subscription?.title}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* buy by number */}
            <div
              to="/shop"
              className={`uppercase transition-all 2xl:text-xl duration-100 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "buy_by_number"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative group`}
            >
              <Link
                to="/shop/magazines"
                onClick={() => {
                  setActiveLink("buy_by_number");
                  // dispatch(handleChangeActiveCategory("magazines"));
                  // dispatch(handleChangeMagazineOrSubscriptionShow(null));
                }}
              >
                {t("buy_by_number")}
              </Link>
              <div className="absolute group-hover:scale-100 z-10 whitespace-nowrap font-medium transition-all duration-300 origin-top-left scale-0 top-8 left-0 space-y-2 bg-white drop-shadow-2xl rounded-lg">
                <Link to="/shop/boismag">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    BOISmag
                  </p>
                </Link>
                <Link to="/shop/agenceur">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    L'Agenceur Magazine
                  </p>
                </Link>
                <Link to="/shop/toiture">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    Toiture Magazine
                  </p>
                </Link>
                <Link to="/shop/artisans-&-bois">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    Artisans & Bois
                  </p>
                </Link>
              </div>
            </div>
            {/* our magaziens */}
            <div
              className={`uppercase transition-all 2xl:text-xl duration-100 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "our_magazines"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative group`}
            >
              <span>{t("our_magazines")}</span>
              <div className="absolute group-hover:scale-100  z-10 whitespace-nowrap font-medium transition-all duration-300 origin-top-left scale-0 top-8 left-0 space-y-2 bg-white drop-shadow-2xl rounded-lg">
                <Link to="https://www.boismag.com/" target="_blank">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    {t("boismag")}
                  </p>
                </Link>
                <Link to="https://www.artisansbois.com/" target="_blank">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    {t("artisans_and_bois")}
                  </p>
                </Link>
                <Link to="https://l-agenceur.com/" target="_blank">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    {t("agenceur")}
                  </p>
                </Link>
                <Link to="https://www.toituremagazine.com/" target="_blank">
                  <p className="p-3 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                    {t("toiture")}
                  </p>
                </Link>
              </div>
            </div>
            {/* contact */}
            <Link
              to="/contact-us"
              className={`uppercase transition-all 2xl:text-xl duration-100 hover:font-semibold hover:bg-gray-200 hover:p-1  text-sm cursor-pointer ${
                activeLink === "contact"
                  ? "border-b-2 border-darkBlue text-darkBlue font-semibold"
                  : "border-0 text-black font-medium"
              } relative`}
              onClick={() => setActiveLink("contact")}
            >
              {t("contact")}
            </Link>
            |{/* cart */}
            <div className="relative">
              {user !== null ? (
                <Link to="cart">
                  <AiOutlineShoppingCart size={25} />
                  <span className="absolute rounded-full -top-3 -right-2 min-w-[1.3rem] leading-[1.3rem] align-middle text-sm bg-darkBlue text-white text-center ">
                    {cart !== undefined && cart?.length > 0 ? cart?.length : 0}
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
            </div>
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
        className={`fixed top-0 left-0 z-20 p-2 pt-10 transition-all origin-top-right duration-300 min-h-screen max-h-screen w-screen bg-white text-black ${
          openSidebar ? "scale-100" : "scale-0"
        }`}
      >
        <AiOutlineClose
          size={30}
          className="cursor-pointer absolute top-14 right-5"
          onClick={() => setOpenSidebar(false)}
        />
        <ul className="md:w-1/2 w-[85%] md:mx-auto md:space-y-5 space-y-3 md:px-10 px-5">
          {/* home */}
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
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("home")}
            </Link>
          </li>
          {/* shop */}
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
                // dispatch(handleChangeActiveCategory("view_all"));
                // dispatch(handleChangeMagazineOrSubscriptionShow(null));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("shop")}
            </Link>
          </li>
          {/* subscribe */}
          <li
            className={`${
              activeLink === "subscribe"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 `}
          >
            <div
              className="flex justify-between items-center cursor-pointer select-none"
              onClick={() => {
                dropDownList === "" ||
                dropDownList === "buy_by_number" ||
                dropDownList === "our_magazines"
                  ? setDropDownList("subscribe")
                  : setDropDownList("");
              }}
            >
              <p
              // onClick={() => {
              //   dispatch(handleChangeActiveCategory("subscriptions"));
              //   dispatch(handleChangeMagazineOrSubscriptionShow(false));
              // }}
              >
                {t("subscribe")}
              </p>
              <AiOutlineDown
                size={20}
                className={`ransition-all duration-100 cursor-pointer ease-linear ${
                  dropDownList === "subscribe" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* dropdown */}
            <div
              className={`rounded-lg font-medium transition-all duration-300 origin-top ${
                dropDownList === "subscribe" ? "block" : "hidden"
              }  space-y-2 bg-gray-100`}
            >
              {!subscriptionLoading && subscriptions?.length > 0 && (
                <div className="space-y-1 text-sm">
                  {subscriptions?.map((subscription) => (
                    <Link
                      key={subscription?._id}
                      to={`/shop/subscription/${subscription?._id}`}
                    >
                      <p
                        onClick={() => {
                          // handleOnClickForSubscription(subscription?._id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setOpenSidebar(false);
                        }}
                        className="p-1 md:pl-5 pl-2 cursor-pointer break-words hover:bg-darkGray uppercase hover:text-white transition-all duration-100"
                      >
                        {subscription?.title}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
          {/* buy by number */}
          <li
            className={`${
              activeLink === "buy_by_number"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 space-y-2`}
          >
            <div
              className="flex justify-between items-center cursor-pointer select-none"
              onClick={() => {
                dropDownList === "" ||
                dropDownList === "subscribe" ||
                dropDownList === "our_magazines"
                  ? setDropDownList("buy_by_number")
                  : setDropDownList("");
              }}
            >
              <p>{t("buy_by_number")}</p>
              <AiOutlineDown
                size={20}
                className={`ransition-all duration-100 cursor-pointer ease-linear ${
                  dropDownList === "buy_by_number" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {/* dropdown */}
            <div
              className={`text-sm rounded-lg font-medium transition-all duration-300 origin-top ${
                dropDownList === "buy_by_number" ? "block" : "hidden"
              }  space-y-1 bg-gray-100`}
            >
              <Link onClick={() => setOpenSidebar(false)} to="/shop/boismag">
                <p className="p-1 md:pl-5 pl-2 cursor-pointer break-words hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  BOISmag
                </p>
              </Link>
              <Link onClick={() => setOpenSidebar(false)} to="/shop/agenceur">
                <p className="p-1 md:pl-5 pl-2 cursor-pointer break-words hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  L'Agenceur Magazine
                </p>
              </Link>
              <Link onClick={() => setOpenSidebar(false)} to="/shop/toiture">
                <p className="p-1 md:pl-5 pl-2 cursor-pointer break-words hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  Toiture Magazine
                </p>
              </Link>
              <Link
                onClick={() => setOpenSidebar(false)}
                to="/shop/artisans-&-bois"
              >
                <p className="p-1 md:pl-5 pl-2 cursor-pointer break-words hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  Artisans & Bois
                </p>
              </Link>
            </div>
          </li>
          {/* our mmagazines */}
          <li
            className={`${
              activeLink === "our_magazines"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 space-y-2`}
          >
            <div
              className="flex justify-between items-center select-none cursor-pointer"
              onClick={() => {
                dropDownList === "" ||
                dropDownList === "buy_by_number" ||
                dropDownList === "subscribe"
                  ? setDropDownList("our_magazines")
                  : setDropDownList("");
              }}
            >
              <span>our magazines</span>
              <AiOutlineDown
                size={20}
                className={`ransition-all duration-100 cursor-pointer ease-linear ${
                  dropDownList === "our_magazines" ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {/* dropdown */}
            <div
              className={`text-sm rounded-lg font-medium transition-all duration-300 origin-top ${
                dropDownList === "our_magazines" ? "block" : "hidden"
              }  space-y-1 bg-gray-100`}
            >
              <Link to="https://www.boismag.com/" target="_blank">
                <p className="p-2 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  {t("boismag")}
                </p>
              </Link>
              <Link to="https://www.artisansbois.com/" target="_blank">
                <p className="p-2 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  {t("artisans_and_bois")}
                </p>
              </Link>
              <Link to="https://l-agenceur.com/" target="_blank">
                <p className="p-2 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  {"agenceur"}
                </p>
              </Link>
              <Link to="https://www.toituremagazine.com/" target="_blank">
                <p className="p-2 hover:bg-darkGray uppercase hover:text-white transition-all duration-100">
                  {t("toiture")}
                </p>
              </Link>
            </div>
          </li>
          {/* contact */}
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
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("contact")}
            </Link>
          </li>
          {/* cart */}
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
                {t("cart")}
              </span>
            ) : (
              <Link
                to="/cart"
                onClick={() => {
                  setActiveLink("cart");
                  setOpenSidebar(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {t("cart")}
              </Link>
            )}
          </li>
          {/* search */}
          <li
            className={`${
              activeLink === "search"
                ? "border-l-4 border-darkBlue font-semibold pl-4 bg-gray-100"
                : "bg-none font-medium"
            } uppercase transition-all duration-300 cursor-pointer`}
            onClick={() => {
              setOpenSidebar(false);
              dispatch(handleChangeShowSearch(true));
            }}
          >
            {t("search")}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
