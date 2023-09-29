import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveCategory } from "../redux/ShopSlice";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";

const Categories = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);

  const { activeCategory, magazines, subscriptions } = useSelector(
    (state) => state.root.shop
  );

  const dispatch = useDispatch();

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

  return (
    <div className="w-full border">
      <p className="bg-darkBlue text-white p-4 text-left font-semibold md:text-lg">
        <span>Categories</span>
        <AiOutlineDown
          size={20}
          className="float-right lg:hidden block cursor-pointer"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        />
      </p>
      {showCategoryDropdown && (
        <div className="space-y-3 font-semibold p-3 md:text-base text-sm">
          <p
            onClick={() => dispatch(handleChangeActiveCategory("view_all"))}
            className={`${
              activeCategory === "view_all" && "underline text-darkBlue"
            } underline-offset-2 cursor-pointer text-left capitalize md:text-base text-sm`}
          >
            View All
          </p>
          <p
            className={`${
              activeCategory === "subscriptions" &&
              "underline text-darkBlue underline-offset-2"
            } text-black text-left capitalize cursor-pointer`}
            onClick={() =>
              dispatch(handleChangeActiveCategory("subscriptions"))
            }
          >
            Subscriptions ({subscriptions?.length ?? "0"})
          </p>
          <p
            onClick={() => dispatch(handleChangeActiveCategory("magazines"))}
            className={`${
              activeCategory === "magazines" &&
              "underline text-darkBlue underline-offset-2"
            } text-black text-left capitalize cursor-pointer`}
          >
            Magazines ({magazines?.length ?? "0"}){" "}
          </p>
          <ul className="list-disc font-semibold pl-6 space-y-2">
            <li
              onClick={() =>
                dispatch(handleChangeActiveCategory("artisans_and_bois"))
              }
              className={`${
                activeCategory === "artisans_and_bois" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
            >
              Artisans & Bois (
              {magazines.length > 0 &&
                magazines.filter((magazine) =>
                  magazine?.magazineTitle.includes("artisans_and_bois")
                ).length}
              )
            </li>
            <li
              className={`${
                activeCategory === "boismag" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
              onClick={() => dispatch(handleChangeActiveCategory("boismag"))}
            >
              BOISmag (
              {magazines.length > 0 &&
                magazines.filter((magazine) =>
                  magazine?.magazineTitle.includes("boismag")
                ).length}
              )
            </li>
            <li
              className={`${
                activeCategory === "agenceur" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
              onClick={() => dispatch(handleChangeActiveCategory("agenceur"))}
            >
              L’agenceur magazine(
              {magazines.length > 0 &&
                magazines.filter((magazine) =>
                  magazine?.magazineTitle.includes("agenceur")
                ).length}
              )
            </li>
            <li
              className={`${
                activeCategory === "toiture" &&
                "text-darkBlue underline underline-offset-2"
              } cursor-pointer`}
              onClick={() => dispatch(handleChangeActiveCategory("toiture"))}
            >
              Toiture magazine (
              {magazines.length > 0 &&
                magazines.filter((magazine) =>
                  magazine?.magazineTitle.includes("toiture")
                ).length}
              )
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
