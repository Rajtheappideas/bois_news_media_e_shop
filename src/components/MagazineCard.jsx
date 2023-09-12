import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeSubscriptionShow } from "../redux/ShopSlice";

const MagazineCard = ({ image, title, price, description }) => {
  const { selectedView, activeCategory } = useSelector(
    (state) => state.root.shop
  );

  const dispatch = useDispatch();

  return (
    <div className="w-full">
      {selectedView === "single" ? (
        //  horizontal card
        <div className="w-full md:text-left text-center group flex md:flex-row flex-col items-start gap-3 md:border-0 md:p-0 border p-2">
          <img
            src={image}
            alt="magazine"
            className="xl:w-1/5 md:w-1/4 w-1/2 cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out object-contain object-center h-fit mx-auto"
            onClick={() => dispatch(handleChangeSubscriptionShow(true))}
          />
          <div className="space-y-2">
            <p className="font-semibold md:text-left text-center md:text-lg">
              {title}
            </p>
            <p className="md:text-base md:text-left text-justify text-sm font-medium tracking-normal leading-normal">
              {description}
            </p>
            {price && (
              <p className="md:text-xl text-lg font-semibold text-darkBlue">
                From € {price}
              </p>
            )}
          </div>
        </div>
      ) : (
        //  vertical card
        <div className="space-y-2 md:text-left text-center w-full cursor-pointer border md:border-0 md:p-0 p-3">
          <img
            src={image}
            alt="magazine"
            className={`w-full hover:scale-105 transition-all duration-300 ${
              activeCategory === "subscriptions" || "magazines"
                ? "md:min-h-[30rem] md:max-h-[30rem] min-h-[15rem] max-h-[15rem]"
                : "min-h-[25rem] max-h-[25rem]"
            } md:object-fill object-contain object-center`}
            onClick={() => dispatch(handleChangeSubscriptionShow(true))}
          />
          <p className="font-semibold md:text-lg">{title}</p>
          {price && (
            <p className="font-semibold md:text-base text-darkBlue">
              From € {price}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MagazineCard;
