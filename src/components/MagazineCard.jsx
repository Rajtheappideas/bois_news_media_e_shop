import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../redux/ShopSlice";
import BaseUrl from "../BaseUrl";

const MagazineCard = ({ data, from }) => {
  const { selectedView } = useSelector((state) => state.root.shop);

  const dispatch = useDispatch();

  const handleDispatchAction = () => {
    dispatch(handleChangeMagazineOrSubscriptionShow(true));
    dispatch(
      handleChangeSingleMagazineOrSubscription({
        id: data?._id,
        type: data?.magazineId ? "magazine" : "subscription",
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {selectedView === "single" ? (
        //  horizontal card
        <div className="w-full md:text-left text-center group flex md:flex-row flex-col items-start  gap-3 md:border-0 md:p-0 border p-2">
          <img
            src={BaseUrl.concat(data?.image)}
            alt={data?.title}
            className=" md:min-w-[12rem] max-w-[12rem] md:mx-0 mx-auto w-full cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out object-fill object-center"
            onClick={() => handleDispatchAction()}
            loading="lazy"
          />
          <div className="space-y-2 w-full">
            <p className="font-semibold md:text-left text-center md:text-lg">
              {data?.title}
            </p>
            <p className="md:text-base xl:text-left text-justify text-sm font-medium tracking-normal leading-normal">
              {data?.description}
            </p>
            <p className="md:text-xl text-lg font-semibold text-darkBlue">
              From € {data?.price}
            </p>
          </div>
        </div>
      ) : (
        //  vertical card
        <div
          onClick={() => handleDispatchAction()}
          className={`md:space-y-2 space-y-1 md:text-left text-center w-full cursor-pointer ${
            from === "similar_products" ? "border-0" : "border"
          }  md:border-0 md:p-0 p-3`}
        >
          <img
            src={BaseUrl.concat(data?.image)}
            alt={data?.title}
            className={`w-full hover:scale-105  transition-all duration-300 lg:max-h-[25rem] ${
              from === "similar_products" && "md:min-h-[25rem] min-h-[20rem]"
            } max-h-[20rem] object-contain object-center`}
            loading="lazy"
          />
          <p className="font-semibold md:text-lg text-center"> {data?.title}</p>

          <p className="font-semibold md:text-xl text-lg text-darkBlue text-center">
            From € {data?.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default MagazineCard;
