import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../redux/ShopSlice";
import { PublicS3Url } from "../BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MagazineCard = memo(({ data, from }) => {
  const { selectedView } = useSelector((state) => state.root.shop);
  const { taxPricing, eec_switzerland_overseas_territories } = useSelector(
    (state) => state.root.cart
  );
  const { addresses } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { t } = useTranslation();

  const handleDispatchAction = () => {
    if (data?.magazineId) return navigate(`/shop/magazine/${data?._id}`);
    return navigate(`/shop/subscription/${data?._id}`);
    // dispatch(handleChangeMagazineOrSubscriptionShow(true));
    // dispatch(
    //   handleChangeSingleMagazineOrSubscription({
    //     id: data?._id,
    //     type: data?.magazineId ? "magazine" : "subscription",
    //   })
    // );
    // window.scrollTo({ top: 0, behavior: "smooth" });
    // setTimeout(() => {
    //   if (!location.pathname.includes("shop")) return navigate("shop");
    // }, 300);
  };

  function getStartingFromPrice() {
    const convertToLowerCase = eec_switzerland_overseas_territories.map(
      (country) => country.toLocaleLowerCase()
    );

    const baseTaxFromZone = addresses
      ? convertToLowerCase.includes(
          addresses?.shippingAddress?.country.toLocaleLowerCase()
        )
        ? taxPricing?.EEC_Switzerland_Overseas
        : addresses?.shippingAddress?.country.toLocaleLowerCase() === "france"
        ? taxPricing?.MetropolitanFrance
        : taxPricing?.RestOfTheWorld
      : taxPricing?.MetropolitanFrance;

    const tax = (data?.priceDigital * baseTaxFromZone) / 100;

    return data?.priceDigital + tax;
  }

  const lowerCaseStatesAndCountries = eec_switzerland_overseas_territories.map(
    (country) => country.toLocaleLowerCase()
  );

  function CheckConutryAndState() {
    if (data?.subscriptionId) {
      if (
        lowerCaseStatesAndCountries.includes(
          addresses?.shippingAddress?.province.toLowerCase()
        ) ||
        lowerCaseStatesAndCountries.includes(
          addresses?.shippingAddress?.country.toLowerCase()
        )
      ) {
        return data?.pricePaperEEC;
      } else if (
        addresses?.shippingAddress?.country.toLowerCase() === "france"
      ) {
        return data?.pricePaperFrance;
      } else {
        return data?.pricePaperRestOfWorld;
      }
    } else {
      return data?.pricePaper;
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "keyframes",
        duration: 0.5,
      }}
      className="w-full"
    >
      {selectedView === "single" ? (
        //  horizontal card
        <div className="w-full md:text-left text-center group flex md:flex-row flex-col items-start  gap-3 md:border-0 md:p-0 border p-2">
          <img
            src={PublicS3Url.concat(data?.image)}
            alt={data?.title}
            className="md:min-w-[15rem] max-w-[15rem] md:min-h-[20rem] max-h-[20rem] md:mx-0 mx-auto w-full cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out object-fill object-center"
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
              {t("Starting From")} €{" "}
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 1,
              }).format(CheckConutryAndState())}
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
            src={PublicS3Url.concat(data?.image)}
            alt={data?.title}
            className={`w-full hover:scale-105 transition-all duration-300 lg:max-h-[25rem]  max-h-[20rem] min-h-[20rem] lg:min-h-[25rem] object-contain object-center`}
            loading="lazy"
          />
          <p className="font-semibold md:text-lg text-center"> {data?.title}</p>

          {from !== "purchase_by_number" && (
            <p className="font-semibold md:text-xl text-lg text-darkBlue text-center">
              {t("Starting From")} €{" "}
              {Intl.NumberFormat("fr-FR", {
                maximumFractionDigits: 1,
              }).format(CheckConutryAndState())}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
});

export default MagazineCard;
