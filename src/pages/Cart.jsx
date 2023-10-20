import React, { useEffect, useState } from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeShowSignin } from "../redux/globalStates";
import { Link, useNavigate } from "react-router-dom";
import SingleProduct from "../components/Cart/SingleProduct";
import {
  handleApplyPromoCode,
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleChangeDiscount,
  handleChangePromoCodeDiscount,
  handleChangePromoCodeRemove,
  handleChangeShipping,
  handleChangeTax,
  handleGetCart,
  handleUpdateCart,
  handleUpdateProductToCart,
} from "../redux/CartSlice";
import { useTranslation } from "react-i18next";
import { Country, State, City } from "country-state-city";
import useAbortApiCall from "../hooks/useAbortApiCall";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "../validations/ValidationSchema";
import toast from "react-hot-toast";
import { handleChangeUserAddress } from "../redux/AuthSlice";
import { AiOutlineClose } from "react-icons/ai";

const Cart = () => {
  const [showAddressFields, setshowAddressFields] = useState(false);
  const [productsToUpdate, setProductsToUpdate] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showStateField, setShowStateField] = useState(true);
  const [promoCodeText, setPromoCodeText] = useState("");

  const { user, token, addresses, addressLoading } = useSelector(
    (state) => state.root.auth
  );
  const {
    cart,
    subTotal,
    getCartLoading,
    total,
    updateOrAddLoading,
    taxPricing,
    shippingPricing,
    eec_switzerland_overseas_territories,
    discount,
    tax,
    promoCodeLoading,
    promoCode,
    isPromoCodeApplied,
    promoCodeDiscount,
  } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { AddressSchema } = ValidationSchema(showStateField);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    resetField,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      address1: addresses?.shippingAddress?.address1,
      zipCode: addresses?.shippingAddress?.zipCode,
      province: addresses?.shippingAddress?.province,
      country: addresses?.shippingAddress?.country,
      city: addresses?.shippingAddress?.city,
    },
  });

  const handleChangeAddress = (data) => {
    const { city, zipCode, province, country } = data;

    if (!isDirty) return;
    const response = dispatch(
      handleChangeUserAddress({
        addressType: "shipping",
        address1: addresses?.shippingAddress?.address1,
        address2: addresses?.shippingAddress?.address2,
        address3: addresses?.shippingAddress?.address3,
        city,
        province,
        country,
        zipCode,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("address edited successfully."), { duration: 2000 });
          setshowAddressFields(false);
          dispatch(handleCalculateTotal());
        }
      });
    }
  };

  const handleUpdateProduct = () => {
    if (productsToUpdate.length === 0) return;
    const response = dispatch(
      handleUpdateCart({
        products: productsToUpdate,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          dispatch(handleUpdateProductToCart(productsToUpdate));
          setProductsToUpdate([]);
        }
      });
    }
  };

  const handleApplyPromocode = () => {
    toast.remove();
    if (!promoCodeText) return toast.error("Enter a promo code.");
    const response = dispatch(
      handleApplyPromoCode({
        code: promoCodeText,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(res?.payload?.message);
          calculatePromoCodeDiscount(res?.payload?.promoCode);
          calculateTax();
        } else {
          setPromoCodeText("");
        }
      });
    }
  };

  const handleRemovePromoCode = () => {
    dispatch(handleChangePromoCodeRemove());
    setPromoCodeText("");
    toast.success("Promo code removed");
  };

  function calculateDiscount() {
    const quantity = cart.reduce((acc, curr) => {
      if (curr?.itemType === "Magazine") {
        return parseInt(acc + curr?.quantity);
      }
      return acc;
    }, 0);
    if (quantity >= 4) {
      dispatch(handleChangeDiscount(40));
      return 40;
    } else if (quantity === 3) {
      dispatch(handleChangeDiscount(30));
      return 30;
    } else if (quantity === 2) {
      dispatch(handleChangeDiscount(15));
      return 15;
    } else {
      dispatch(handleChangeDiscount(0));
      return 0;
    }
  }

  function calculateShipping() {
    const convertToLowerCase = eec_switzerland_overseas_territories.map(
      (country) => country.toLocaleLowerCase()
    );
    if (
      convertToLowerCase.includes(
        addresses?.shippingAddress?.country.toLocaleLowerCase()
      )
    ) {
      dispatch(
        handleChangeShipping(
          parseInt(shippingPricing?.EEC_Switzerland_Overseas)
        )
      );
      return parseInt(shippingPricing?.EEC_Switzerland_Overseas);
    } else if (
      addresses?.shippingAddress?.country.toLocaleLowerCase() === "france"
    ) {
      dispatch(
        handleChangeShipping(parseInt(shippingPricing?.MetropolitanFrance))
      );
      return parseInt(shippingPricing?.MetropolitanFrance);
    } else {
      dispatch(handleChangeShipping(parseInt(shippingPricing?.RestOfTheWorld)));
      return parseInt(shippingPricing?.RestOfTheWorld);
    }
  }

  function calculateTax() {
    const convertToLowerCase = eec_switzerland_overseas_territories.map(
      (country) => country.toLocaleLowerCase()
    );
    if (subTotal === 0) return;
    if (promoCode?.discountPercentage == 100) {
      dispatch(handleChangeTax(0));
      return 0;
    }
    if (
      convertToLowerCase.includes(
        addresses?.shippingAddress?.country.toLocaleLowerCase()
      )
    ) {
      if (!promoCodeDiscount) {
        dispatch(
          handleChangeTax(
            (parseInt(parseInt(subTotal) - discount) *
              parseInt(taxPricing?.EEC_Switzerland_Overseas)) /
              100
          )
        );
        return (
          (parseInt(parseInt(subTotal) - discount) *
            parseInt(taxPricing?.EEC_Switzerland_Overseas)) /
          100
        );
      } else {
        dispatch(
          handleChangeTax(
            (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
              parseInt(taxPricing?.EEC_Switzerland_Overseas)) /
              100
          )
        );
        return (
          (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
            parseInt(taxPricing?.EEC_Switzerland_Overseas)) /
          100
        );
      }
    } else if (
      addresses?.shippingAddress?.country.toLocaleLowerCase() === "france"
    ) {
      if (!promoCodeDiscount) {
        dispatch(
          handleChangeTax(
            (parseInt(parseInt(subTotal) - discount) *
              parseInt(taxPricing?.MetropolitanFrance)) /
              100
          )
        );

        return (
          (parseInt(parseInt(subTotal) - discount) *
            parseInt(taxPricing?.MetropolitanFrance)) /
          100
        );
      }
      dispatch(
        handleChangeTax(
          (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
            parseInt(taxPricing?.MetropolitanFrance)) /
            100
        )
      );

      return (
        (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
          parseInt(taxPricing?.MetropolitanFrance)) /
        100
      );
    } else {
      if (!promoCodeDiscount) {
        dispatch(
          handleChangeTax(
            (parseInt(parseInt(subTotal) - discount) *
              parseInt(taxPricing?.RestOfTheWorld)) /
              100
          )
        );

        return (
          (parseInt(parseInt(subTotal) - discount) *
            parseInt(taxPricing?.RestOfTheWorld)) /
          100
        );
      }
      dispatch(
        handleChangeTax(
          (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
            parseInt(taxPricing?.RestOfTheWorld)) /
            100
        )
      );

      return (
        (parseInt(parseInt(subTotal) - discount - promoCodeDiscount) *
          parseInt(taxPricing?.RestOfTheWorld)) /
        100
      );
    }
  }

  function calculateSubTotal() {
    const subTotal = cart.reduce((acc, cur) => {
      return acc + parseInt(cur?.itemId?.price) * parseInt(cur?.quantity);
    }, 0);
    if (subTotal !== NaN && typeof subTotal === "number") {
      return subTotal;
    }
  }

  function calculatePromoCodeDiscount(code) {
    if (!code) return;

    dispatch(
      handleChangePromoCodeDiscount(
        parseFloat(
          (parseInt(code?.discountPercentage) * parseInt(calculateSubTotal())) /
            100
        ).toFixed(2)
      )
    );
    return parseFloat(
      (parseInt(code?.discountPercentage) * parseInt(calculateSubTotal())) / 100
    ).toFixed(2);
  }

  // for get cart or show login screen
  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
    if (user !== null) {
      dispatch(handleGetCart({ token }));
      setCountries(Country.getAllCountries());
      setSelectedCountry(addresses?.shippingAddress?.country);
      setPromoCodeText(promoCode?.code);
    }

    return () => abortApiCall();
  }, []);

  // for calculate total & subtotal
  useEffect(() => {
    if (user !== null && cart?.length > 0 && !getCartLoading) {
      dispatch(handleCalculateSubTotal());
      dispatch(handleCalculateTotal());
      calculatePromoCodeDiscount(promoCode);
      calculateDiscount();
    }
  }, [
    getCartLoading,
    updateOrAddLoading,
    addressLoading,
    discount,
    tax,
    promoCodeDiscount,
  ]);

  // for change state while country change
  useEffect(() => {
    let findCountry = "";
    if (selectedCountry === "") {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === addresses?.shippingAddress?.country
      );
      setSelectedCountry(findCountry?.name);
    }
    findCountry = Country.getAllCountries().find(
      (c) => c.name === getValues("country")
    );
    if (State.getStatesOfCountry(findCountry?.isoCode).length > 0) {
      resetField("province", "");
      setSelectedCountry(findCountry?.name);
      setStates(State.getStatesOfCountry(findCountry?.isoCode));
      !showStateField && setShowStateField(true);
    } else {
      setShowStateField(false);
    }
  }, [watch("country")]);

  return (
    <>
      <Helmet>
        <title>{t("Cart")} | E-shop</title>
      </Helmet>
      <div className="Container md:space-y-7 space-y-3 md:py-10 py-5 transition-all duration-100 ease-linear">
        {/* <HeadNavigationLink /> */}
        {getCartLoading ? (
          <div className="loading my-10">{t("Loading").concat("...")}</div>
        ) : updateOrAddLoading ? (
          <Loader />
        ) : cart !== undefined && cart.length > 0 ? (
          <>
            {/* cart box */}
            <div className="outline-none space-y-3 border ">
              <div className="border overflow-x-scroll scrollbar">
                <table className="outline-none w-full overflow-x-scroll">
                  <thead className="w-full border-b border-gray-300 text-center">
                    <tr>
                      <th className="md:p-4 p-2 text-center"></th>
                      <th className="md:p-4 p-2 lg:text-left text-center">
                        {t("Product")}
                      </th>
                      <th className="md:p-4 p-2 text-center">{t("Price")}</th>
                      <th className="md:p-4 p-2 text-center">
                        {t("Quantity")}
                      </th>
                      <th className="md:p-4 p-2 text-right">{t("Subtotal")}</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {cart !== undefined &&
                      cart?.length > 0 &&
                      cart?.map((product) => (
                        <SingleProduct
                          handleUpdateProduct={handleUpdateProduct}
                          key={product?._id}
                          product={product}
                          setProductsToUpdate={setProductsToUpdate}
                          productsToUpdate={productsToUpdate}
                        />
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="w-full flex md:flex-row flex-col items-center justify-between md:gap-2 gap-5 lg:px-4 px-2 py-3">
                <div className="flex items-center md:flex-nowrap flex-wrap gap-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3 input_field"
                    placeholder="Promo Code"
                    value={promoCodeText}
                    onChange={(e) => {
                      !isPromoCodeApplied && setPromoCodeText(e.target.value);
                    }}
                    disabled={isPromoCodeApplied || promoCodeLoading}
                  />
                  <button
                    onClick={() => {
                      handleApplyPromocode();
                    }}
                    disabled={
                      updateOrAddLoading ||
                      getCartLoading ||
                      promoCodeLoading ||
                      isPromoCodeApplied
                    }
                    className={` ${
                      (isPromoCodeApplied || promoCodeLoading) &&
                      "cursor-not-allowed"
                    } uppercase gray_button w-full md:min-h-[3rem]`}
                  >
                    {isPromoCodeApplied
                      ? "Applied"
                      : promoCodeLoading
                      ? t("Applying").concat("...")
                      : t("Apply Promo code")}
                  </button>
                  {isPromoCodeApplied && (
                    <AiOutlineClose
                      size={40}
                      role="button"
                      title="remove promo code"
                      onClick={() => handleRemovePromoCode()}
                    />
                  )}
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => handleUpdateProduct()}
                    className={`uppercase gray_button w-auto ${
                      productsToUpdate.length === 0 && "cursor-not-allowed"
                    } `}
                    disabled={
                      updateOrAddLoading || getCartLoading || promoCodeLoading
                    }
                  >
                    {updateOrAddLoading ? t("Updating...") : t("update cart")}
                  </button>
                </div>
              </div>
            </div>
            {/* total box */}
            <div className="w-full border transition-all duration-100 ease-linear">
              {/* sub total */}
              <div className="w-full flex items-start justify-between p-4">
                {/* sub total + shipping */}
                <div className="font-semibold md:text-base text-sm text-left space-y-2">
                  <p>{t("Sub total")}</p>
                  <p>{t("Tax")}</p>
                  <p>{t("Shipping")}</p>
                </div>
                <div className="font-medium md:text-base text-sm text-right space-y-2">
                  {/* subtotal */}
                  <p>
                    €&nbsp;
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(parseFloat(subTotal))}
                  </p>
                  {/* tax */}
                  <p>
                    <b>€&nbsp;{calculateTax()}</b>
                  </p>
                  {/* address */}
                  <div className="text-darkGray font-semibold space-y-3">
                    {/* address */}
                    <div className="space-y-2 text-black">
                      {/* shipping */}
                      <p>
                        <b>€&nbsp;{calculateShipping()}</b>
                      </p>
                      <p>
                        {t("Delivery to")} {addresses?.shippingAddress?.zipCode}{" "}
                        {addresses?.shippingAddress?.city}, <br />{" "}
                        {addresses?.shippingAddress?.province}, <br />{" "}
                        {addresses?.shippingAddress?.country}
                      </p>
                      {/* <p
                        className="text-darkGray cursor-pointer inline-block"
                        onClick={() => setshowAddressFields(!showAddressFields)}
                      >
                        {t("Change address")}
                      </p> */}
                    </div>
                    {/* address fields */}
                    <form
                      onSubmit={handleSubmit(handleChangeAddress)}
                      className={`${
                        showAddressFields ? "scale-100 h-full" : "scale-0 h-0"
                      } transition-all duration-300 origin-top flex flex-col gap-2 md:w-60 w-auto`}
                    >
                      <select
                        name="country"
                        {...register("country")}
                        className="input_field w-full"
                      >
                        {countries.length > 0 &&
                          countries.map((country, i) => (
                            <option
                              key={i}
                              selected={
                                addresses?.shippingAddress?.country ===
                                country?.name
                              }
                              value={country?.name}
                            >
                              {country?.name}
                            </option>
                          ))}
                      </select>
                      <span className="error">{errors?.country?.message}</span>
                      {showStateField && (
                        <>
                          <select
                            name="state"
                            {...register("province")}
                            className="input_field w-full"
                          >
                            {states.length > 0 &&
                              states.map((state, i) => (
                                <option
                                  key={i}
                                  value={state?.name}
                                  selected={
                                    addresses?.shippingAddress?.province ===
                                    state?.name
                                  }
                                >
                                  {state?.name}
                                </option>
                              ))}
                          </select>
                          <span className="error">
                            {errors?.province?.message}
                          </span>
                        </>
                      )}
                      <input
                        type="text"
                        placeholder="City"
                        className="input_field w-full"
                        {...register("city")}
                      />
                      <span className="error">{errors?.city?.message}</span>
                      <input
                        type="text"
                        placeholder="Postal code"
                        className="input_field w-full"
                        {...register("zipCode")}
                      />
                      <span className="error">{errors?.zipCode?.message}</span>
                      <button className="w-full gray_button">
                        {addressLoading
                          ? t("Updating").concat("...")
                          : t("update")}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full flex items-center justify-between p-4">
                <div className="font-semibold md:text-base text-sm text-left">
                  {discount !== 0 && <p>{t("Discount")}</p>}
                  {isPromoCodeApplied && <p>{t("Promo Code")}</p>}
                  <p>{t("Total")}</p>
                </div>
                <div>
                  {discount !== 0 && (
                    <p className="font-medium md:text-base text-sm text-right text-black">
                      <b>
                        € -&nbsp;
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 3,
                        }).format(calculateDiscount())}
                      </b>
                    </p>
                  )}
                  {isPromoCodeApplied && (
                    <p className="font-medium md:text-base text-sm text-right text-black">
                      <b>
                        € -&nbsp;
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 3,
                        }).format(promoCodeDiscount)}{" "}
                        ({promoCode?.discountPercentage}%) off
                      </b>
                    </p>
                  )}
                  <p className="font-medium md:text-base text-sm text-right text-black">
                    <b>
                      € &nbsp;
                      {Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 3,
                      }).format(parseFloat(total))}
                    </b>
                    &nbsp; (including tax + shipping)
                  </p>
                </div>
              </div>
            </div>
            {/* btn */}
            <div className="text-right">
              <Link to="/checkout">
                <button className="gray_button uppercase md:w-52">
                  {t("place order")}
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="loading my-10 flex items-center flex-col gap-2">
            <p>{t("Your cart is empty")}.</p>
            <Link to="/shop" className="blue_button w-40 font-light capitalize">
              {t("continue shopping")}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
