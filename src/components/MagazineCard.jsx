import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeMagazineShow,
  handleChangeSingleMagazine,
  handleChangeSingleSubscription,
  handleChangeSubscriptionShow,
} from "../redux/ShopSlice";
import BaseUrl from "../BaseUrl";

const MagazineCard = ({ data }) => {
  const { selectedView, activeCategory } = useSelector(
    (state) => state.root.shop
  );

  const dispatch = useDispatch();

  const handleDispatchAction = () => {
    if (activeCategory === "magazines") {
      dispatch(handleChangeMagazineShow(true));
      dispatch(handleChangeSingleMagazine(data?._id));
    } else if (activeCategory === "subscriptions") {
      dispatch(handleChangeSubscriptionShow(true));
      dispatch(handleChangeSingleSubscription(data?._id));
    }
  };

  return (
    <div className="w-full">
      {selectedView === "single" ? (
        //  horizontal card
        <div className="w-full md:text-left text-center group flex md:flex-row flex-col items-start  gap-3 md:border-0 md:p-0 border p-2">
          <img
            src={BaseUrl.concat(data?.image)}
            alt={data?.title}
            className="xl:w-1/5 md:w-1/4 w-full cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out object-contain object-center md:max-h-[15rem] max-h-[20rem]"
            onClick={() => handleDispatchAction()}
          />
          <div className="space-y-2">
            <p className="font-semibold md:text-left text-center md:text-lg">
              {data?.title}
            </p>
            <p className="md:text-base md:text-left text-justify text-sm font-medium tracking-normal leading-normal">
              {data?.description}
            </p>
            <p className="md:text-xl text-lg font-semibold text-darkBlue">
              From € {data?.price}
            </p>
          </div>
        </div>
      ) : (
        //  vertical card
        <div className="md:space-y-2 space-y-1 md:text-left text-center w-full cursor-pointer border md:border-0 md:p-0 p-3">
          <img
            src={BaseUrl.concat(data?.image)}
            alt={data?.title}
            className={`w-full hover:scale-105  transition-all duration-300 lg:max-h-[25rem] max-h-[20rem] object-contain object-center`}
            onClick={() => handleDispatchAction()}
          />
          <p className="font-semibold md:text-lg"> {data?.title}</p>
          <p className="md:text-base xl:text-left text-justify text-sm font-medium tracking-normal leading-normal">
            {data?.description}
          </p>
          <p className="font-semibold md:text-xl text-lg text-darkBlue">
            From € {data?.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default MagazineCard;
