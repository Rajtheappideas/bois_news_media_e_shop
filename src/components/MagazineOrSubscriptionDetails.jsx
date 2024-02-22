import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleGetMagazineById,
  handleGetSubscriptionById,
} from "../redux/ShopSlice";
import SimilarProducts from "./SimilarProducts";
import { PublicS3Url } from "../BaseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  handleAddMagazineToCart,
  handleAddSubscriptionToCart,
} from "../redux/CartSlice";
import { useTranslation } from "react-i18next";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { handleChangeShowSignup } from "../redux/globalStates";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const MagazineOrSubscriptionDetails = () => {
  const [activeComponent, setActiveComponent] = useState("description");
  const [similarMagazines, setSimilarMagazines] = useState([]);
  const [selectedTypeOfSupport, setSelectedTypeOfSupport] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const {
    singleMagazineOrSubscription,
    allMagazinesAndSubscriptions,
    singleMagazineOrSubscriptionGetLoading,
  } = useSelector((state) => state.root.shop);

  const {
    cart,
    updateOrAddLoading,
    shippingPricing,
    eec_switzerland_overseas_territories,
    taxPricing,
  } = useSelector((state) => state.root.cart);
  const { token, addresses } = useSelector((state) => state.root.auth);

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  let isAlreadyInCart = false;

  const findIncart =
    cart !== undefined &&
    cart?.length > 0 &&
    cart?.find((p) => p?.itemId?._id === singleMagazineOrSubscription?._id);

  if (findIncart) {
    isAlreadyInCart = true;
  } else {
    isAlreadyInCart = false;
  }

  function getAnnualPublications(magazineTitle) {
    const magazinePublications = {
      boismag: 8,
      agenceur: 5,
      artisans_and_bois: 4,
      toiture: 4,
    };

    if (magazinePublications.hasOwnProperty(magazineTitle))
      return magazinePublications[magazineTitle];
    else return 0;
  }

  const lowerCaseStatesAndCountries = eec_switzerland_overseas_territories.map(
    (country) => country.toLocaleLowerCase()
  );

  function CheckConutryAndState(type) {
    if (type === "subscription") {
      if (selectedTypeOfSupport === "paper") {
        if (
          lowerCaseStatesAndCountries.includes(
            addresses?.shippingAddress?.province.toLowerCase()
          ) ||
          lowerCaseStatesAndCountries.includes(
            addresses?.shippingAddress?.country.toLowerCase()
          )
        ) {
          return singleMagazineOrSubscription?.pricePaperEEC;
        } else if (
          addresses?.shippingAddress?.country.toLowerCase() === "france"
        ) {
          return singleMagazineOrSubscription?.pricePaperFrance;
        } else {
          return singleMagazineOrSubscription?.pricePaperRestOfWorld;
        }
      } else {
        return singleMagazineOrSubscription?.priceDigital;
      }
    } else {
      if (selectedTypeOfSupport === "paper")
        return singleMagazineOrSubscription?.pricePaper;
      return singleMagazineOrSubscription?.priceDigital;
    }
  }

  function priceForMagazineAndSubscription() {
    let price;
    if (!selectedTypeOfSupport) return;
    if (selectedTypeOfSupport === "digital") {
      price = parseFloat(singleMagazineOrSubscription?.priceDigital);
    } else {
      price = CheckConutryAndState(
        singleMagazineOrSubscription?.subscriptionId
          ? "subscription"
          : "magazine"
      );

      // const baseShippingPriceFromZone = addresses
      //   ? convertToLowerCase.includes(
      //       addresses?.shippingAddress?.country.toLocaleLowerCase()
      //     )
      //     ? shippingPricing?.EEC_Switzerland_Overseas
      //     : addresses?.shippingAddress?.country.toLocaleLowerCase() === "france"
      //     ? shippingPricing?.MetropolitanFrance
      //     : shippingPricing?.RestOfTheWorld
      //   : shippingPricing?.MetropolitanFrance;

      // let _quantity = quantity;
      // if (singleMagazineOrSubscription?.subscriptionId) {
      //   // In a subscription, there are N magazines, so we multiply the N per the price of shipping
      //   _quantity = getAnnualPublications(
      //     singleMagazineOrSubscription.magazineTitle
      //   );
      // }
      // console.log(quantity);

      // price =
      //   parseFloat(singleMagazineOrSubscription?.pricePaper) *
      //     (singleMagazineOrSubscription?.subscriptionId
      //       ? 1
      //       : parseFloat(quantity)) +
      //   parseFloat(_quantity);
      // parseFloat(baseShippingPriceFromZone) * parseFloat(_quantity);
    }
    return parseFloat(price);

    // const baseTaxFromZone = addresses
    //   ? convertToLowerCase.includes(
    //       addresses?.shippingAddress?.country.toLocaleLowerCase()
    //     )
    //     ? taxPricing?.EEC_Switzerland_Overseas
    //     : addresses?.shippingAddress?.country.toLocaleLowerCase() === "france"
    //     ? taxPricing?.MetropolitanFrance
    //     : taxPricing?.RestOfTheWorld
    //   : taxPricing?.MetropolitanFrance;
  }

  const handleOnchageQuantity = (e) => {
    toast.remove();

    if (e.target.value < 1) {
      setQuantity(1);
      return toast.error(
        "quantity should not less than 1 and value should be valid"
      );
    }
    setQuantity(e.target.value.replace(/\b0+/g, ""));
  };

  const handleProductAddToCartFunction = () => {
    if (!token) {
      dispatch(handleChangeShowSignup(true));
      return;
    }

    toast.remove();
    if (
      selectedTypeOfSupport === "" ||
      (selectedTypeOfSupport === "paper" &&
        !singleMagazineOrSubscription?.subscriptionId &&
        quantity === "")
    ) {
      return toast.error(t("please fill all the fields"));
    }

    // for magazine add to cart
    if (singleMagazineOrSubscription?.magazineId) {
      const response = dispatch(
        handleAddMagazineToCart({
          support: selectedTypeOfSupport,
          quantity: parseInt(quantity),
          id: singleMagazineOrSubscription?._id,
          token,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.status === "success") {
            toast.success(
              `${singleMagazineOrSubscription?.title} Added to cart.`
            );
          }
        });
      }
    }

    // for subscription add to cart
    if (singleMagazineOrSubscription?.subscriptionId) {
      const response = dispatch(
        handleAddSubscriptionToCart({
          support: selectedTypeOfSupport,
          id: singleMagazineOrSubscription?._id,
          token,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.status === "success") {
            toast.success(
              `${singleMagazineOrSubscription?.title} Added to cart.`
            );
          }
        });
      }
    }
  };

  useEffect(() => {
    if (singleMagazineOrSubscription?.subscriptionId) {
      setSimilarMagazines(
        allMagazinesAndSubscriptions.filter(
          (m) =>
            m?.hasOwnProperty("subscriptionId") &&
            m?.title !== singleMagazineOrSubscription?.title
        )
      );
    } else {
      setSimilarMagazines(
        allMagazinesAndSubscriptions.filter((m) =>
          m?.magazineTitle.includes(singleMagazineOrSubscription?.magazineTitle)
        )
      );
    }
  }, [singleMagazineOrSubscription, selectedTypeOfSupport]);

  useEffect(() => {
    priceForMagazineAndSubscription();
  }, [quantity]);

  // fetch data by id
  useEffect(() => {
    if (location.pathname.includes("subscription")) {
      dispatch(handleGetSubscriptionById({ id }));
    } else {
      dispatch(handleGetMagazineById({ id }));
    }
  }, [id]);

  // for abort api
  useEffect(() => {
    return () => abortApiCall();
  }, []);

  if (singleMagazineOrSubscriptionGetLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full Container lg:space-y-7 md:space-y-5 space-y-3 md:py-10 py-5">
      {/* back btn */}
      <BsArrowLeft size={25} role="button" onClick={() => navigate(-1)} />
      {/* img + add to cart details */}
      <div className="w-full flex lg:flex-row flex-col items-start justify-start md:gap-5 gap-3">
        <img
          src={PublicS3Url.concat(singleMagazineOrSubscription?.image)}
          alt={singleMagazineOrSubscription?.title}
          className="lg:w-1/2 w-full max-h-[25rem] object-contain object-center"
          loading="lazy"
        />
        {/* input fields */}
        <div className="lg:w-2/3 w-full md:space-y-4 space-y-2">
          <p className="font-semibold md:text-xl text-lg lg:text-left text-center">
            {singleMagazineOrSubscription?.title}
          </p>
          {/* type of support */}
          <div className="w-full flex items-center gap-3 font-semibold">
            <p className="md:w-3/12 md:text-base text-sm md:whitespace-nowrap">
              {t("Type of support")}
            </p>
            <select
              disabled={isAlreadyInCart}
              name="type_of_support"
              onChange={(e) => setSelectedTypeOfSupport(e.target.value)}
              className="border p-2 w-full outline-none font-light"
              value={
                findIncart !== undefined && findIncart
                  ? findIncart?.support
                  : selectedTypeOfSupport
              }
            >
              <option label="Choisissez une option"></option>
              {(addresses?.shippingAddress?.country.toLowerCase() ===
                "france" ||
                singleMagazineOrSubscription?.subscriptionId) && (
                <option value="paper">{t("Paper and Digital")}</option>
              )}
              <option value="digital">{"Digital"}</option>
            </select>
          </div>
          {/* qty */}
          {!singleMagazineOrSubscription?.subscriptionId &&
            selectedTypeOfSupport === "paper" && (
              <div className="w-full flex items-center gap-3 font-semibold">
                <p className="md:w-3/12 md:text-base text-sm">
                  {t("Quantity")}
                </p>
                <input
                  type="number"
                  disabled={isAlreadyInCart || updateOrAddLoading}
                  placeholder="1"
                  className="w-full p-2 border outline-none"
                  value={
                    findIncart !== undefined && findIncart
                      ? findIncart?.quantity
                      : quantity
                  }
                  min={1}
                  onChange={(e) => handleOnchageQuantity(e)}
                />
              </div>
            )}
          {/* price */}
          {selectedTypeOfSupport && (
            <p className="font-semibold md:text-xl text-lg space-x-2">
              <span>{t("Price")}:</span>
              <span className="text-darkBlue">
                €&nbsp;
                {Intl.NumberFormat("fr-FR", {
                  maximumFractionDigits: 1,
                }).format(priceForMagazineAndSubscription())}
              </span>
            </p>
          )}
          {/* btn */}
          <button
            className={`w-full gray_button h-12 ${
              isAlreadyInCart && "cursor-not-allowed"
            } `}
            onClick={() => {
              handleProductAddToCartFunction();
            }}
            disabled={isAlreadyInCart || updateOrAddLoading}
          >
            {updateOrAddLoading
              ? t("Adding").concat("...")
              : isAlreadyInCart
              ? t("Already in cart")
              : t("+ Add to cart")}
          </button>
        </div>
      </div>
      {/* tab btns */}
      <div className="w-full border-b-2 flex items-center gap-3 md:text-base text-sm">
        <p
          className={`${
            activeComponent === "description"
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue bg-gray-100 p-1"
              : "font-medium"
          } cursor-pointer transition-all duration-100`}
          onClick={() => setActiveComponent("description")}
        >
          {t("Description")}
        </p>
        <p
          className={`${
            activeComponent === "further_info"
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue bg-gray-100 p-1"
              : "font-medium"
          } cursor-pointer transition-all duration-100`}
          onClick={() => setActiveComponent("further_info")}
        >
          {t("Further information")}
        </p>
      </div>
      {/* description */}
      {activeComponent === "description" && (
        <div
          dangerouslySetInnerHTML={{
            __html: singleMagazineOrSubscription?.detailDescription,
          }}
          className="md:space-y-4  space-y-2"
        >
          {/* {singleMagazineOrSubscription?.description} */}
        </div>
      )}
      {/*further info */}
      {activeComponent === "further_info" && (
        <div className="md:space-y-4 space-y-2">
          <p>
            <span>
              <b>{t("Type of support")}:</b>
            </span>{" "}
            &nbsp;
            <span>{t("Digital (pdf), Paper and digital (pdf)")}</span>
          </p>
          <p>
            <span>
              <b>{t("Shipping area")}:</b>
            </span>{" "}
            &nbsp;
            <span>
              EEC / Switzerland / Dom-tom, Metropolitan France, Rest of the
              world
            </span>
          </p>
        </div>
      )}
      {/* get discount */}
      {singleMagazineOrSubscription?.subscriptionId && (
        <div className=" w-full lg:space-y-5 space-y-3">
          {/* text */}
          <div className="text-black Container tracking-normal 2xl:space-y-7 md:space-y-3 space-y-1">
            <p className="md:text-xl font-semibold">
              {t("SUBSCRIBE TO")} {t("MULTIPLE MAGAZINES")}{" "}
              {t("AND GET A DISCOUNT")}
            </p>
          </div>
          {/* round circles */}
          <div className="Container flex items-center lg:gap-10 gap-5 flex-wrap">
            <div className="text-center space-y-2 text-black">
              <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-darkBlue bg-yellow-500">
                - 15 €
              </p>
              <p className="md:text-base text-xs">
                Pour <br />2 {t("TRACKS")}
              </p>
            </div>
            <div className="text-center space-y-2 text-black">
              <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-darkBlue bg-yellow-500">
                - 30 €
              </p>
              <p className="md:text-base text-xs">
                Pour <br />3 {t("TRACKS")}
              </p>
            </div>
            <div className="text-center space-y-2 text-black">
              <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-darkBlue bg-yellow-500">
                - 40 €
              </p>
              <p className="md:text-base text-xs">
                Pour <br />4 {t("TRACKS")}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* similar products */}
      {similarMagazines.length > 0 && (
        <SimilarProducts similarMagazines={similarMagazines} />
      )}
    </div>
  );
};

export default MagazineOrSubscriptionDetails;
