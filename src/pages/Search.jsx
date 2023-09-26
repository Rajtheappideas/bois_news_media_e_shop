import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BaseUrl from "../BaseUrl";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../redux/ShopSlice";

const Search = () => {
  const { searchMagazines } = useSelector((s) => s.root.globalStates);

  const { searchTerm } = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatch = (id, type) => {
    dispatch(handleChangeSingleMagazineOrSubscription({ id, type }));
    dispatch(handleChangeMagazineOrSubscriptionShow(true));
    setTimeout(() => {
      navigate("/shop");
    }, 500);
  };

  return (
    <div className="Container lg:space-y-7 md:space-y-5 space-y-3 lg:py-10 py-7">
      <p className="md:text-lg lg:pt-8 pt-4 pb-4">
        <b>Search result found&nbsp;:&nbsp;</b>
        {searchTerm ?? "-"}
      </p>
      {searchMagazines.length > 0 ? (
        searchMagazines.map((magazine) => (
          <div
            key={magazine?._id}
            className="flex md:flex-row flex-col items-start justify-start gap-3"
          >
            <img
              src={BaseUrl.concat(magazine?.image)}
              alt={magazine?.title}
              className="md:max-w-[15rem] md:min-w-[15rem] w-full lg:h-72 h-60 object-contain object-center"
            />
            <div className="md:space-y-3 space-y-2">
              <p className="font-semibold md:text-xl md:text-left text-center md:mx-0 mx-auto">
                {magazine?.title}
              </p>
              <p className="font-medium md:text-left text-center">01/01/70</p>
              <p className="tracking-wide font-medium leading-normal lg:text-left text-justify">
                {magazine?.description}
              </p>
              <div className="md:text-left text-center">
                <button
                  onClick={() => {
                    handleDispatch(
                      magazine?._id,
                      magazine?.magazineId ? "magazine" : "subscription"
                    );
                  }}
                  className="capitalize gray_button md:w-40 w-1/2"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="loading">
          No Magazines or Subscription here, Search magazines or subscription.
        </div>
      )}
    </div>
  );
};

export default Search;
