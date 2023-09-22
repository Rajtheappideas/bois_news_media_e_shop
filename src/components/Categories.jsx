import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeActiveCategory } from "../redux/ShopSlice";

const Categories = () => {
  const { activeCategory, magazines, subscriptions } = useSelector(
    (state) => state.root.shop
  );

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
              dispatch(handleChangeActiveCategory("craftsmen_&_wood"))
            }
            className={`${
              activeCategory === "craftsmen_&_wood" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
          >
            Craftsmen & Wood (30)
          </li>
          <li
            className={`${
              activeCategory === "woodmag" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() => dispatch(handleChangeActiveCategory("woodmag"))}
          >
            WOODmag (72)
          </li>
          <li
            className={`${
              activeCategory === "the_magazine_designer" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() =>
              dispatch(handleChangeActiveCategory("the_magazine_designer"))
            }
          >
            The magazine designer
          </li>
          <li
            className={`${
              activeCategory === "roofing_magazine" &&
              "text-darkBlue underline underline-offset-2"
            } cursor-pointer`}
            onClick={() =>
              dispatch(handleChangeActiveCategory("roofing_magazine"))
            }
          >
            Roofing magazine (24)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
