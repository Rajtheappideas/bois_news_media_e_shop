import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveCategory } from "../redux/ShopSlice";

const Categories = () => {
  const { activeCategory } = useSelector((state) => state.root.shop);

  const dispatch = useDispatch();

  return (
    <div className="w-full border">
      <p className="bg-darkBlue text-white p-4 text-left font-semibold md:text-lg">
        Categories
      </p>
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
          onClick={() => dispatch(handleChangeActiveCategory("subscriptions"))}
        >
          Subscriptions (4)
        </p>
        <p
          onClick={() => dispatch(handleChangeActiveCategory("magazines"))}
          className={`${
            activeCategory === "magazines" &&
            "underline text-darkBlue underline-offset-2"
          } text-black text-left capitalize cursor-pointer`}
        >
          Magazines (166){" "}
        </p>
        <ul className="list-disc font-semibold pl-6 space-y-2">
          <li
            onClick={() =>
              dispatch(handleChangeActiveCategory("Craftsmen_Wood"))
            }
            className={`${
              activeCategory === "Craftsmen_Wood" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
          >
            Craftsmen & Wood (30)
          </li>
          <li
            className={`${
              activeCategory === "WOODmag" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() => dispatch(handleChangeActiveCategory("WOODmag"))}
          >
            WOODmag (72)
          </li>
          <li
            className={`${
              activeCategory === "The_magazine_designer" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() =>
              dispatch(handleChangeActiveCategory("The_magazine_designer"))
            }
          >
            The magazine designer
          </li>
          <li
            className={`${
              activeCategory === "Magazine_roof" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() =>
              dispatch(handleChangeActiveCategory("Magazine_roof"))
            }
          >
            Magazine roof (24)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
