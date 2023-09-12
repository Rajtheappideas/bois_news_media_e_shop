import React from "react";
import { useSelector } from "react-redux";

const SubscriptionCard = ({ image, title, price, description }) => {
  const { selectedView } = useSelector((state) => state.root.globalStates);
  return (
    <div className="w-full">
      {selectedView === "single" ? (
        //  horizontal card
        <div className="w-full group flex md:flex-row flex-col items-start gap-3 md:border-0 md:p-0 border p-2">
          <img
            src={image}
            alt="magazine"
            className="md:w-1/5 w-1/2 cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out object-contain object-center h-fit mx-auto"
          />
          <div className="space-y-4">
            <p className="font-semibold text-left md:text-lg">{title}</p>
            <p className="md:text-base text-sm font-medium tracking-normal leading-normal">
              {description}
            </p>
            <p className="md:text-xl text-lg font-semibold text-darkBlue">
              From € {price}
            </p>
          </div>
        </div>
      ) : (
        //  vertical card
        <div className="space-y-1 w-full cursor-pointer">
          <img
            src={image}
            alt="magazine"
            className="w-full hover:scale-105 transition-all duration-300 min-h-[25rem] max-h-[25rem] object-fill object-center"
          />
          <p className="font-semibold md:text-lg">{title}</p>
          <p className="font-semibold md:text-base text-darkBlue">
            From € {price}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
