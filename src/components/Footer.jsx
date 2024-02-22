import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleChangeActiveCategory } from "../redux/ShopSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribeNewsLetter = async (e) => {
    e.preventDefault();
    toast.remove();
    if (!email) return inputRef.current.focus();
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email
      )
    )
      return toast.error(t("enter valid email"));
    setLoading(true);
    try {
      await axios({
        data: { email },
        headers: {
          "Content-Type": "application/json",
        },
        url: "https://hooks.zapier.com/hooks/catch/14786850/3qjpqmk/",
        method: "post",
      });

      toast.success(t("subscribed successfully"));
      setEmail("");
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      }
      setLoading(false);
    }
  };

  return (
    <footer className="md:space-y-5 space-y-3">
      {/* news letter */}
      <div className="w-full bg-darkBlue text-white py-6">
        <div className="Container w-full flex flex-col lg:flex-row items-center justify-between md:gap-5 gap-2">
          <div className="space-y-2">
            <p className="font-semibold uppercase xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl">
              {t("SUBSCRIBE TO OUR NEWSLETTER")}
            </p>
            <p className="font-medium md:text-lg text-sm">
              {t("Sign up to receive email updates about courses")}
            </p>
          </div>
          <form className="flex items-center lg:w-fit gap-2 w-full justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white xl:w-80 lg:w-60 sm:w-1/2 w-full p-2 text-black outline-none focus:border-2 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              ref={inputRef}
            />
            <button
              className="uppercase text-white bg-black text-center w-auto p-2"
              onClick={(e) => handleSubscribeNewsLetter(e)}
              disabled={loading}
            >
              {loading ? t("subscribing").concat("...") : t("subscribe")}
            </button>
          </form>
        </div>
      </div>
      {/* footer */}
      <div className="Container md:py-5 grid lg:grid-cols-3 md:grid-cols-2 place-items-start items-start md:gap-5 gap-3">
        <div>
          <Link to="/" onClick={() => scrollToTop()}>
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
            {t("shop")}
            <span className="bg-darkBlue w-14 absolute -bottom-1 left-0 h-0.5 rounded-lg" />
          </p>
          <ul className="font-medium ">
            <Link to="/" onClick={() => scrollToTop()}>
              <li className="hover:border-l-4  hover:font-semibold capitalize border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("home")}
              </li>
            </Link>
            <Link
              to="/shop/subscriptions"
              onClick={() => {
                scrollToTop();
                dispatch(handleChangeActiveCategory("subscriptions"));
              }}
            >
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue capitalize transition-all duration-100 ease-linear hover:pl-3">
                {t("subscribe")}
              </li>
            </Link>
            <Link
              to="/shop"
              onClick={() => {
                scrollToTop();
                dispatch(handleChangeActiveCategory("view_all"));
              }}
            >
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue capitalize transition-all duration-100 ease-linear hover:pl-3">
                {t("shop")}
              </li>
            </Link>
            <Link
              to="/shop/magazines"
              onClick={() => {
                scrollToTop();
                dispatch(handleChangeActiveCategory("magazines"));
              }}
            >
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue capitalize transition-all duration-100 ease-linear hover:pl-3">
                {t("our_magazines")}
              </li>
            </Link>
            <Link to="/contact-us" onClick={() => scrollToTop()}>
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue capitalize transition-all duration-100 ease-linear hover:pl-3">
                {t("contact")}
              </li>
            </Link>
          </ul>
        </div>
        {/* WOOD NETWORK NEWS MEDIA */}
        <div className="w-full">
          <p className="font-semibold text-lg mb-4 relative uppercase">
            {t("WOOD NETWORK NEWS MEDIA")}
            <span className="bg-darkBlue w-14 absolute -bottom-1 left-0 h-0.5 rounded-lg" />
          </p>
          <ul className="font-medium ">
            <Link
              to="https://www.boismag.com/"
              target="_blank"
              onClick={() => scrollToTop()}
            >
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("boismag")}
              </li>
            </Link>
            <Link
              to="https://www.artisansbois.com/"
              target="_blank"
              onClick={() => scrollToTop()}
            >
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("artisans_and_bois")}
              </li>
            </Link>
            <Link
              to="https://l-agenceur.com/"
              target="_blank"
              onClick={() => scrollToTop()}
            >
              <li className="hover:border-l-4 my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("agenceur")}
              </li>
            </Link>
            <Link
              to="https://www.toituremagazine.com/"
              target="_blank"
              onClick={() => scrollToTop()}
            >
              <li className="hover:border-l-4 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("toiture")}
              </li>
            </Link>
            <Link
              to="https://woodpartners.fr/"
              target="_blank"
              onClick={() => scrollToTop()}
            >
              <li className="hover:border-l-4  my-2 hover:font-semibold border-darkBlue transition-all duration-100 ease-linear hover:pl-3">
                {t("WoodPartners")}
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* copy right */}
      <div className="text-sm text-black text-center bg-lightGray p-2 font-semibold">
        Copyright © {new Date().getFullYear()}{" "}
        <span className="uppercase">{t("bois_news_media")}</span>
      </div>
    </footer>
  );
};

export default Footer;
