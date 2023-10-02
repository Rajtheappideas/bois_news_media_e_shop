import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeMagazineOrSubscriptionShow } from "../redux/ShopSlice";
import SimilarProducts from "./SimilarProducts";
import BaseUrl from "../BaseUrl";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { handleAddProductToCart } from "../redux/CartSlice";
import { useTranslation } from "react-i18next";

const MagazineOrSubscriptionDetails = () => {
  const [activeComponent, setActiveComponent] = useState("description");
  const [similarMagazines, setSimilarMagazines] = useState([]);
  const [selectedTypeOfSupport, setSelectedTypeOfSupport] = useState("");
  const [selectedShippingZone, setSelectedShippingZone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { singleMagazineOrSubscription, allMagazinesAndSubscriptions } =
    useSelector((state) => state.root.shop);

  const { cart } = useSelector((state) => state.root.cart);

  let isAlreadyInCart = false;

  const findIncart =
    cart !== undefined &&
    cart?.length > 0 &&
    cart?.find((p) => p._id === singleMagazineOrSubscription?._id);

  if (findIncart) {
    isAlreadyInCart = true;
  } else {
    isAlreadyInCart = false;
  }

  function priceForMagazineAndSubscription(from) {
    if (!selectedTypeOfSupport) return;
    if (selectedTypeOfSupport === "digital") {
      return parseFloat(singleMagazineOrSubscription?.digitalPrice);
    } else if (selectedShippingZone === "EEC_Switzerland_Overseas") {
      if (from === "base_price") {
        return singleMagazineOrSubscription?.paperPrice
          ?.EEC_Switzerland_Overseas;
      }
      if (singleMagazineOrSubscription?.magazineId) {
        return (
          parseFloat(
            singleMagazineOrSubscription?.paperPrice?.EEC_Switzerland_Overseas
          ) * parseFloat(quantity)
        );
      }
      return singleMagazineOrSubscription?.paperPrice?.EEC_Switzerland_Overseas;
    } else if (selectedShippingZone === "RestOfTheWorld") {
      if (singleMagazineOrSubscription?.magazineId) {
        return (
          parseFloat(singleMagazineOrSubscription?.paperPrice?.RestOfTheWorld) *
          parseFloat(quantity)
        );
      }
      if (from === "base_price") {
        return parseFloat(
          singleMagazineOrSubscription?.paperPrice?.RestOfTheWorld
        );
      }
      return singleMagazineOrSubscription?.paperPrice?.RestOfTheWorld;
    } else if (selectedShippingZone === "MetropolitanFrance") {
      if (singleMagazineOrSubscription?.magazineId) {
        return (
          parseFloat(
            singleMagazineOrSubscription?.paperPrice?.MetropolitanFrance
          ) * parseFloat(quantity)
        );
      }
      if (from === "base_price") {
        return parseFloat(
          singleMagazineOrSubscription?.paperPrice?.MetropolitanFrance
        );
      }
      return singleMagazineOrSubscription?.paperPrice?.MetropolitanFrance;
    }
  }

  const handleOnchageQuantity = (e) => {
    toast.remove();

    if (e.target.value < 1) {
      setQuantity(1);
      return toast.error(
        "quantity should not less than 1 and value should be valid"
      );
    }
    // else if (!/^(?=.*[1-9])\d{1,3}(?:\.\d\d?)?$/.test(e.target.value)) {
    //   return toast.error(
    //     "Quantity should not be more than 3 digits and quantity should valid value"
    //   );
    // }
    setQuantity(e.target.value.replace(/\b0+/g, ""));
  };

  const handleProductAddToCartFunction = () => {
    toast.remove();
    if (
      selectedShippingZone === "" ||
      selectedTypeOfSupport === "" ||
      (selectedTypeOfSupport === "paperAndDigital" &&
        !singleMagazineOrSubscription?.subscriptionId &&
        quantity === "")
    ) {
      return toast.error(t("please fill all the fields"));
    }
    // if (quantity.length > 3) {
    //   return toast.error("quantity should not be more than 3 digits");
    // }
    dispatch(
      handleAddProductToCart({
        selectedShippingZone,
        selectedTypeOfSupport,
        quantity,
        _id: singleMagazineOrSubscription?._id,
        isSubscription: singleMagazineOrSubscription?.subscriptionId
          ? true
          : false,
        price: priceForMagazineAndSubscription("base_price"),
        title: singleMagazineOrSubscription?.title,
      })
    );
    setSelectedShippingZone("");
    setSelectedTypeOfSupport("");
    setQuantity(1);
  };

  useEffect(() => {
    setSimilarMagazines(
      allMagazinesAndSubscriptions.filter((m) =>
        m?.magazineTitle.includes(singleMagazineOrSubscription?.magazineTitle)
      )
    );
  }, [singleMagazineOrSubscription, selectedTypeOfSupport]);

  useEffect(() => {
    priceForMagazineAndSubscription();
  }, [selectedShippingZone]);

  console.log(quantity);
  return (
    <div className="w-full lg:space-y-7 md:space-y-5 space-y-3">
      {/* back btn */}
      <BsArrowLeft
        size={25}
        role="button"
        onClick={() => dispatch(handleChangeMagazineOrSubscriptionShow(false))}
      />
      {/* img + add to cart details */}
      <div className="w-full flex lg:flex-row flex-col items-start justify-start md:gap-5 gap-3">
        <img
          src={BaseUrl.concat(singleMagazineOrSubscription?.image)}
          alt={singleMagazineOrSubscription?.title}
          className="lg:w-1/2 w-full max-h-[25rem] object-contain object-center"
          loading="lazy"
        />
        {/* input fields */}
        <div className="lg:w-2/3 w-full md:space-y-4 space-y-2">
          <p className="font-semibold md:text-xl text-lg lg:text-left text-center">
            {singleMagazineOrSubscription?.title}
          </p>
          <p className="font-semibold md:text-lg lg:text-left text-center text-darkBlue">
            {t("From")} €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(singleMagazineOrSubscription?.digitalPrice)}
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
                  ? findIncart?.selectedTypeOfSupport
                  : selectedTypeOfSupport
              }
            >
              <option label="Choose an option"></option>
              <option value="paperAndDigital">{t("Paper and Digital")}</option>
              <option value="digital">{"Digital"}</option>
            </select>
          </div>
          {/* shipping area */}
          <div className="w-full flex items-center gap-3 font-semibold">
            <p className="md:w-3/12 md:text-base text-sm">
              {t("Shipping area")}
            </p>
            <select
              onChange={(e) => setSelectedShippingZone(e.target.value)}
              disabled={isAlreadyInCart}
              name="shipping_area"
              className="border p-2 w-full font-light outline-none"
              value={
                findIncart !== undefined && findIncart
                  ? findIncart?.selectedShippingZone
                  : selectedShippingZone
              }
            >
              <option label="Select your shipping zone"></option>
              <option value="EEC_Switzerland_Overseas">
                EEC / Switzerland / Dom-tom
              </option>
              <option value="MetropolitanFrance">
                {t("Metropolitan France")}
              </option>
              <option value="RestOfTheWorld">{t("Rest of the world")}</option>
            </select>
          </div>
          {/* qty */}
          {!singleMagazineOrSubscription?.subscriptionId &&
            selectedTypeOfSupport === "paperAndDigital" && (
              <div className="w-full flex items-center gap-3 font-semibold">
                <p className="md:w-3/12 md:text-base text-sm">
                  {t("Quantity")}
                </p>
                <input
                  type="number"
                  disabled={isAlreadyInCart}
                  placeholder="1"
                  className="w-full p-2 border outline-none"
                  value={quantity}
                  min={1}
                  onChange={(e) => handleOnchageQuantity(e)}
                />
              </div>
            )}
          {/* price */}
          {selectedShippingZone && selectedTypeOfSupport && (
            <p className="font-semibold md:text-xl text-lg space-x-2">
              <span>{t("Price")}:</span>
              <span className="text-darkBlue">
                €&nbsp;
                {Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
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
            disabled={isAlreadyInCart}
          >
            {isAlreadyInCart ? t("Already in cart") : t("+ Add to cart")}
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
        <div className="md:space-y-4  space-y-2">
          {singleMagazineOrSubscription?.description}
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
      {/* similar products */}
      {similarMagazines.length > 0 && (
        <SimilarProducts similarMagazines={similarMagazines} />
      )}
    </div>
  );
};

export default MagazineOrSubscriptionDetails;
