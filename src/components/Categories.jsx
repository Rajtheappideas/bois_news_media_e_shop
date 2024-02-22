import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveCategory } from "../redux/ShopSlice";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Categories = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);

  const { activeCategory, magazines, subscriptions } = useSelector(
    (state) => state.root.shop
  );

  const dispatch = useDispatch();

  const location = useLocation();

  const { t } = useTranslation();

  // for auto open category dropdown
  useEffect(() => {
    if (!showCategoryDropdown && window.innerWidth >= 1024) {
      setShowCategoryDropdown(true);
    }

    window.addEventListener("resize", () => {
      if (window.screen.width >= 1024) {
        setShowCategoryDropdown(true);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.innerWidth]);

  useEffect(() => {
    const activeCategory = location.pathname.split("/")[2];
    if (activeCategory) {
      dispatch(handleChangeActiveCategory(location.pathname.split("/")[2]));
    } else {
      dispatch(handleChangeActiveCategory("view_all"));
    }
  }, [location]);

  return (
    <div className="w-full border">
      <p
        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        className="bg-darkBlue lg:cursor-default cursor-pointer text-white p-4 text-left font-semibold md:text-lg"
      >
        <span>{t("Categories")}</span>
        <AiOutlineDown
          size={20}
          className="float-right lg:hidden block cursor-pointer"
        />
      </p>
      {showCategoryDropdown && (
        <div className="space-y-3 font-semibold p-3 md:text-base text-sm">
          <p
            // onClick={() => dispatch(handleChangeActiveCategory("view_all"))}
            className={`${
              activeCategory === "view_all" && "underline text-darkBlue"
            } underline-offset-2 cursor-pointer text-left capitalize md:text-base text-sm`}
          >
            <Link to="/shop">{t("View All")}</Link>
          </p>
          <p
            className={`${
              activeCategory === "subscriptions" &&
              "underline text-darkBlue underline-offset-2"
            } text-black text-left capitalize`}
          >
            <Link to="/shop/subscriptions">
              {t("Subscriptions")} ({subscriptions?.length ?? "0"})
            </Link>
          </p>
          <p
            className={`${
              activeCategory === "magazines" &&
              "underline text-darkBlue underline-offset-2"
            } text-black text-left capitalize cursor-pointer`}
          >
            <Link to="/shop/magazines">
              {t("Magazines")} ({magazines?.length ?? "0"}){" "}
            </Link>
          </p>
          <ul className="list-disc font-semibold pl-6 space-y-2">
            <li
              className={`${
                activeCategory === "artisans-&-bois" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
            >
              <Link to="/shop/artisans-&-bois">
                {t("Artisans & Bois")} (
                {magazines.length > 0 &&
                  magazines.filter((magazine) =>
                    magazine?.magazineTitle.includes("artisans_and_bois")
                  ).length}
                )
              </Link>
            </li>
            <li
              className={`${
                activeCategory === "boismag" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
            >
              <Link to="/shop/boismag">
                {t("BOISmag")} (
                {magazines.length > 0 &&
                  magazines.filter((magazine) =>
                    magazine?.magazineTitle.includes("boismag")
                  ).length}
                )
              </Link>
            </li>
            <li
              className={`${
                activeCategory === "agenceur" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
            >
              <Link to="/shop/agenceur">
                {t("L'Agenceur Magazine")} (
                {magazines.length > 0 &&
                  magazines.filter((magazine) =>
                    magazine?.magazineTitle.includes("agenceur")
                  ).length}
                )
              </Link>
            </li>
            <li
              className={`${
                activeCategory === "toiture" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
            >
              <Link to="/shop/toiture">
                {t("Toiture Magazine")} (
                {magazines.length > 0 &&
                  magazines.filter((magazine) =>
                    magazine?.magazineTitle.includes("toiture")
                  ).length}
                )
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
