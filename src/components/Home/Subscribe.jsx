import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PublicS3Url } from "../../BaseUrl";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../../redux/ShopSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubScribe = () => {
  const { subscriptions, subscriptionLoading } = useSelector(
    (state) => state.root.shop
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleOnClick = (id) => {
    dispatch(handleChangeMagazineOrSubscriptionShow(true));
    dispatch(
      handleChangeSingleMagazineOrSubscription({
        id,
        type: "subscription",
      })
    );
    setTimeout(() => {
      navigate("/shop");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="Container md:space-y-5 space-y-2">
      <p className="heading uppercase">{t("SUBSCRIBE")}</p>
      <div className="grid lg:grid-cols-2 place-items-start items-start lg:gap-5 gap-3">
        {subscriptionLoading ? (
          <div className="loading col-span-full">
            {t("Loading").concat("...")}
          </div>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <div
              key={subscription?._id}
              className="w-full border rounded-lg md:p-3 p-2 flex lg:flex-row flex-col items-start md:gap-3 gap-1 min-h-[20rem]"
            >
              <img
                src={PublicS3Url.concat(subscription?.image)}
                alt={subscription?.title}
                className="lg:min-w-[12rem] lg:max-w-[12rem] w-full min-h-[15rem] max-h-[15rem] object-contain object-center rounded-lg"
              />
              {/* descritpion */}
              <div className="md:space-y-3 w-full space-y-2 tracking-normal md:text-lg text-sm font-medium">
                <p className="md:text-lg font-semibold uppercase text-center lg:text-left">
                  {subscription?.title}:
                </p>
                <p className="xl:text-justify md:text-left text-justify xl:tracking-tight line-clamp-[7]">
                  {subscription?.description}
                </p>

                <div className="text-center lg:text-left w-full mx-auto">
                  <button
                    onClick={() => handleOnClick(subscription?._id)}
                    className="gray_button uppercase md:w-48 w-full"
                  >
                    {t("i SubScribe")}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading">{t("No Subscription here")}.</div>
        )}
      </div>
    </div>
  );
};

export default SubScribe;
