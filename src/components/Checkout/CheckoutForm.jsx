import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ValidationSchema from "../../validations/ValidationSchema";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import OrderSummary from "./OrderSummary";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleChangeDiscount,
  handleChangePromoCodeRemove,
  handleChangeShipping,
  handleChangeTax,
  handleCheckout,
  handleCreatePaymentIntent,
} from "../../redux/CartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleChangeUserAddress } from "../../redux/AuthSlice";

const CheckoutForm = ({
  setActiveComponent,
  activeComponent,
  setClientSecret,
}) => {
  const [showShippingAddressFields, setShowShippingAddressFields] =
    useState(false);
  const [countries, setCountries] = useState([]);
  const [statesForBilling, setStatesForBilling] = useState([]);
  const [statesForShipping, setStatesForShipping] = useState([]);
  const [selectedCountryForBilling, setSelectedCountryForBilling] =
    useState("");
  const [selectedCountryForShipping, setSelectedCountryForShipping] =
    useState("");
  const [showShippingStateField, setShowShippingStateField] = useState(true);
  const [showBillingStateField, setShowBillingStateField] = useState(true);

  const { addresses, token, user, addressLoading } = useSelector(
    (state) => state.root.auth
  );
  const {
    checkoutLoading,
    taxPricing,
    shippingPricing,
    eec_switzerland_overseas_territories,
    subTotal,
    cart,
    promoCode,
    discount,
    promoCodeDiscount,
  } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { checkoutSchema } = ValidationSchema(
    showBillingStateField,
    showShippingStateField
  );

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      billingAddress1: addresses?.billingAddress?.address1,
      billingzipCode: addresses?.billingAddress?.zipCode,
      billingProvince: addresses?.billingAddress?.province,
      billingcountry: addresses?.billingAddress?.country,
      billingcity: addresses?.billingAddress?.city,
      billingFname: user?.fname,
      billingLname: user?.lname,
      billingCompanyName: user?.company,
      shippingAddress1: addresses?.shippingAddress?.address1,
      shippingzipCode: addresses?.shippingAddress?.zipCode,
      shippingProvince: addresses?.shippingAddress?.province,
      shippingcountry: addresses?.shippingAddress?.country,
      shippingcity: addresses?.shippingAddress?.city,
      shippingFname: user?.fname,
      shippingLname: user?.lname,
      phone: user?.phone,
      email: user?.email,
      shippingCompanyName: user?.company,
      VAT: "",
      purchaseOrder: "",
      fieldOfActivity: "",
      orderNotes: "",
    },
  });

  const onSubmit = (data) => {
    const {
      billingAddress1,
      shippingAddress1,
      billingcity,
      shippingcity,
      billingCompanyName,
      shippingCompanyName,
      billingcountry,
      shippingcountry,
      billingzipCode,
      shippingzipCode,
      shippingFname,
      billingFname,
      shippingLname,
      billingLname,
      shippingProvince,
      billingProvince,
      phone,
      email,
      VAT,
      purchaseOrder,
      orderNotes,
    } = data;

    if (Object.values(errors).length > 0) return;
    let shippingAddress = {
      fname: shippingFname,
      lname: shippingLname,
      address1: shippingAddress1,
      zipCode: shippingzipCode,
      city: shippingcity,
      province: shippingProvince,
      country: shippingcountry,
      companyName: shippingCompanyName,
    };

    let billingAddress = {
      fname: billingFname,
      lname: billingLname,
      address1: billingAddress1,
      zipCode: billingzipCode,
      city: billingcity,
      province: billingProvince,
      country: billingcountry,
      companyName: billingCompanyName,
    };
    const response = dispatch(
      handleCreatePaymentIntent({
        shippingAddress: showShippingAddressFields
          ? shippingAddress
          : billingAddress,
        billingAddress,
        phone,
        email,
        VAT,
        purchaseOrder,
        orderNotes,
        code: promoCode !== null ? promoCode?.code : "",
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          setActiveComponent("success");
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveComponent("payment_method");
          setClientSecret(res?.payload?.clientSecret);
        }
      });
    }
  };

  function handleSetStatesForBillingField() {
    let findCountry = "";
    if (selectedCountryForBilling === "") {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === addresses?.billingAddress?.country
      );
      setSelectedCountryForBilling(findCountry?.name);
      setStatesForBilling(State.getStatesOfCountry(findCountry?.isoCode));
    } else {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === getValues("billingcountry")
      );
      setSelectedCountryForBilling(findCountry?.name);
      const states = State.getStatesOfCountry(findCountry?.isoCode);
      if (states.length > 0) {
        setStatesForBilling(State.getStatesOfCountry(findCountry?.isoCode));
        !showBillingStateField && setShowBillingStateField(true);
        if (getValues().billingProvince === "") {
          setValue("billingProvince", states[0]?.name);
        }
        const findStateInStates = states.find((s) =>
          s.name.includes(getValues().billingProvince)
        );
        if (!findStateInStates) {
          setValue("billingProvince", states[0]?.name);
          handleChangeAddress(getValues());
        }
        handleChangeAddress(getValues());
      } else {
        setValue("billingProvince", "");
        setStatesForBilling([]);
        setShowBillingStateField(false);
      }
    }
  }

  function handleSetStatesForShippingField() {
    let findCountry = "";
    if (selectedCountryForShipping === "") {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === addresses?.shippingAddress?.country
      );
      setSelectedCountryForShipping(findCountry?.name);
      setStatesForShipping(State.getStatesOfCountry(findCountry?.isoCode));
    } else {
      findCountry = Country.getAllCountries().find(
        (c) => c.name === getValues("shippingcountry")
      );
      setSelectedCountryForShipping(findCountry?.name);
      const states = State.getStatesOfCountry(findCountry?.isoCode);
      if (states.length > 0) {
        setStatesForShipping(State.getStatesOfCountry(findCountry?.isoCode));
        !showShippingStateField && setShowShippingStateField(true);
        if (getValues().shippingProvince === "") {
          setValue("shippingProvince", states[0]?.name);
          handleChangeAddress(getValues());
        }

        const findStateInStates = states.find((s) =>
          s.name.includes(getValues().shippingProvince)
        );
        if (!findStateInStates) {
          setValue("shippingProvince", states[0]?.name);
        }
        handleChangeAddress(getValues());
      } else {
        setValue("shippingProvince", "");
        setStatesForShipping([]);
        setShowShippingStateField(false);
      }
    }
  }

  function handleChangeAddress(data) {
    if (!showShippingAddressFields || addressLoading) return;
    const response = dispatch(
      handleChangeUserAddress({
        addressType: "shipping",
        address1: addresses?.shippingAddress?.address1,
        address2: addresses?.shippingAddress?.address2,
        address3: addresses?.shippingAddress?.address3,
        city: data?.shippingcity,
        province: data?.shippingProvince,
        country: data?.shippingcountry,
        zipCode: data?.shippingzipCode,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          // toast.success(t("address edited successfully."), { duration: 2000 });
          dispatch(handleCalculateTotal());
        }
      });
    }
  }

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
    if (showShippingAddressFields) {
      const convertToLowerCase = eec_switzerland_overseas_territories.map(
        (country) => country.toLocaleLowerCase()
      );
      if (
        convertToLowerCase.includes(
          getValues()?.shippingcountry.toLocaleLowerCase()
        )
      ) {
        dispatch(
          handleChangeShipping(
            parseInt(shippingPricing?.EEC_Switzerland_Overseas)
          )
        );
        return parseInt(shippingPricing?.EEC_Switzerland_Overseas);
      } else if (
        getValues()?.shippingcountry.toLocaleLowerCase() === "france"
      ) {
        dispatch(
          handleChangeShipping(parseInt(shippingPricing?.MetropolitanFrance))
        );
        return parseInt(shippingPricing?.MetropolitanFrance);
      } else {
        dispatch(
          handleChangeShipping(parseInt(shippingPricing?.RestOfTheWorld))
        );
        return parseInt(shippingPricing?.RestOfTheWorld);
      }
    } else {
      const convertToLowerCase = eec_switzerland_overseas_territories.map(
        (country) => country.toLocaleLowerCase()
      );
      if (
        convertToLowerCase.includes(
          getValues()?.billingcountry.toLocaleLowerCase()
        )
      ) {
        dispatch(
          handleChangeShipping(
            parseInt(shippingPricing?.EEC_Switzerland_Overseas)
          )
        );
        return parseInt(shippingPricing?.EEC_Switzerland_Overseas);
      } else if (getValues()?.billingcountry.toLocaleLowerCase() === "france") {
        dispatch(
          handleChangeShipping(parseInt(shippingPricing?.MetropolitanFrance))
        );
        return parseInt(shippingPricing?.MetropolitanFrance);
      } else {
        dispatch(
          handleChangeShipping(parseInt(shippingPricing?.RestOfTheWorld))
        );
        return parseInt(shippingPricing?.RestOfTheWorld);
      }
    }
  }

  function calculateTax() {
    if (showShippingAddressFields) {
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
          getValues()?.shippingcountry.toLocaleLowerCase()
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
        getValues()?.shippingcountry.toLocaleLowerCase() === "france"
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
    } else {
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
          getValues()?.billingcountry.toLocaleLowerCase()
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
        getValues()?.billingcountry.toLocaleLowerCase() === "france"
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
  }

  useEffect(() => {
    calculateShipping();
    calculateTax();
    calculateDiscount();
    dispatch(handleCalculateTotal());
    console.log(
      addresses.shippingAddress.country,
      addresses.billingAddress.country,
      getValues().shippingcountry,
      getValues().billingcountry
    );
  }, [
    watch("billingcountry"),
    watch("shippingcountry"),
    showShippingAddressFields,
  ]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
    return () => {
      abortApiCall();
    };
  }, []);

  // for billing
  useEffect(() => {
    handleSetStatesForBillingField();
  }, [watch("billingcountry"), watch("billingProvince")]);

  // for shipping
  useEffect(() => {
    handleSetStatesForShippingField();
  }, [watch("shippingcountry"), watch("shippingProvince")]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-start gap-3"
    >
      <div className="md:space-y-5 space-y-3 w-9/12">
        <p className="bg-darkBlue text-white text-left p-4 md:text-lg font-semibold">
          {t("Billing Information")}
        </p>
        {/* name */}
        <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
          <div className="md:w-1/2 w-full">
            <label htmlFor="first_name" className="Label">
              {t("First name")}
            </label>
            <input
              type="text"
              className="w-full input_field"
              {...register("billingFname")}
            />
            <span className="error">{errors?.billingFname?.message}</span>
          </div>
          <div className="md:w-1/2 w-full">
            <label htmlFor="last_name" className="Label">
              {t("Last name")}
            </label>
            <input
              type="text"
              className="w-full input_field"
              {...register("billingLname")}
            />
            <span className="error">{errors?.billingLname?.message}</span>
          </div>
        </div>
        {/* company name */}
        <div className="w-full">
          <label htmlFor="company_name" className="Label">
            {t("Company name")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingCompanyName")}
          />
          <span className="error">{errors?.billingCompanyName?.message}</span>
        </div>
        {/* field of activity */}
        {/* <div className="w-full">
          <label htmlFor="field_of_activity" className="Label">
            {t("Field of activity")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("fieldOfActivity")}
          />
          <span className="error">{errors?.fieldOfActivity?.message}</span>
        </div> */}
        {/* country */}
        <div className="w-full">
          <label htmlFor="country" className="Label">
            {t("country")}
          </label>
          <select
            name="country"
            {...register("billingcountry")}
            className="input_field"
          >
            {countries.length > 0 &&
              countries.map((country, i) => (
                <option
                  value={country?.name}
                  selected={country?.name === getValues().billingcountry}
                  key={i}
                >
                  {country?.name}
                </option>
              ))}
          </select>
          <span className="error">{errors?.billingcountry?.message}</span>
        </div>
        {/* state */}
        {showBillingStateField && (
          <div className="w-full">
            <label htmlFor="province" className="Label">
              {t("state")}
            </label>

            <select
              name="state"
              {...register("billingProvince")}
              className="input_field"
            >
              {statesForBilling.length > 0 &&
                statesForBilling.map((state, i) => (
                  <option
                    value={state?.name}
                    selected={getValues().billingProvince === state?.name}
                    key={i}
                  >
                    {state?.name}
                  </option>
                ))}
            </select>
            <span className="error">{errors?.billingProvince?.message}</span>
          </div>
        )}
        {/* street */}
        <div className="w-full">
          <label htmlFor="street_address" className="Label">
            {t("street address")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingAddress1")}
          />
          <span className="error">{errors?.billingAddress1?.message}</span>
        </div>
        {/* city */}
        <div className="w-full">
          <label htmlFor="city" className="Label">
            {t("city")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingcity")}
          />
          <span className="error">{errors?.billingcity?.message}</span>
        </div>
        {/* postal code */}
        <div className="w-full">
          <label htmlFor="postal_code" className="Label">
            {t("postal code")}
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("billingzipCode")}
          />
          <span className="error">{errors?.billingzipCode?.message}</span>
        </div>
        {/* phone + email */}
        <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
          <div className="md:w-1/2 w-full">
            <label htmlFor="phone" className="Label">
              {t("phone")}
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (value) => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country={"in"}
                  onChange={(value) => {
                    onChange((e) => {
                      setValue("phone", "+".concat(value));
                    });
                  }}
                  value={value}
                  autocompleteSearch={true}
                  countryCodeEditable={false}
                  enableSearch={true}
                  inputStyle={{
                    width: "100%",
                    background: "#f9f9f9",
                    padding: "22px 0 22px 50px",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    // opacity:'0.7'
                  }}
                  dropdownStyle={{
                    background: "white",
                    color: "#13216e",
                    fontWeight: "600",
                    padding: "0px 0px 0px 10px",
                  }}
                />
              )}
            />
            <span className="error">{errors?.phone?.message}</span>
          </div>
          <div className="md:w-1/2 w-full">
            <label htmlFor="email" className="Label">
              {t("email")}
            </label>
            <input
              type="email"
              placeholder="adam@gmail.com"
              className="w-full input_field"
              {...register("email")}
            />
            <span className="error">{errors?.email?.message}</span>
          </div>
        </div>
        {/* vat number */}
        <div className="w-full">
          <label htmlFor="VAT" className="Label">
            {t("VAT number")} (optional)
          </label>
          <input
            type="number"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("VAT")}
          />
        </div>
        {/* puchrse order */}
        <div className="w-full">
          <label htmlFor="purchase_order" className="Label">
            {t("purchase order")} (optional)
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full input_field"
            {...register("purchaseOrder")}
          />
        </div>
        {/* check box for shipping address */}
        <div className="flex items-center gap-3 w-full justify-start">
          <input
            type="checkbox"
            placeholder="Type here..."
            className="w-6 h-6"
            id="diff_shipping_address"
            onClick={() =>
              setShowShippingAddressFields(!showShippingAddressFields)
            }
            disabled={checkoutLoading}
          />
          <label htmlFor="diff_shipping_address" className="Label select-none">
            {t("Ship to a different address?")}
          </label>
        </div>
        {/* shipping address */}
        {showShippingAddressFields && (
          <>
            {/* name */}
            <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
              <div className="md:w-1/2 w-full">
                <label htmlFor="first_name" className="Label">
                  {t("First name")}
                </label>
                <input
                  type="text"
                  className="w-full input_field"
                  {...register("shippingFname")}
                />
                <span className="error">{errors?.shippingFname?.message}</span>
              </div>
              <div className="md:w-1/2 w-full">
                <label htmlFor="last_name" className="Label">
                  {t("Last name")}
                </label>
                <input
                  type="text"
                  className="w-full input_field"
                  {...register("shippingLname")}
                />
                <span className="error">{errors?.shippingLname?.message}</span>
              </div>
            </div>
            {/* company name */}
            <div className="w-full">
              <label htmlFor="company_name" className="Label">
                {t("Company name")} (optional)
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingCompanyName")}
              />
              <span className="error">
                {errors?.shippingCompanyName?.message}
              </span>
            </div>
            {/* address 1*/}
            <div className="w-full">
              <label htmlFor="address_1" className="Label">
                {t("address")} 1
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingAddress1")}
              />
              <span className="error">{errors?.shippingAddress1?.message}</span>
            </div>
            {/* country */}
            <div className="w-full">
              <label htmlFor="country" className="Label">
                {t("country")}
              </label>
              <select
                name="country"
                {...register("shippingcountry")}
                className="input_field"
              >
                {countries.length > 0 &&
                  countries.map((country, i) => (
                    <option
                      value={country?.name}
                      selected={getValues().shippingcountry === country?.name}
                      key={i}
                    >
                      {country?.name}
                    </option>
                  ))}
              </select>

              <span className="error">{errors?.shippingcountry?.message}</span>
            </div>
            {/* province */}
            {showShippingStateField && (
              <div className="w-full">
                <label htmlFor="province" className="Label">
                  {t("state")}
                </label>
                <select
                  name="state"
                  {...register("shippingProvince")}
                  className="input_field"
                >
                  {statesForShipping.length > 0 &&
                    statesForShipping.map((state, i) => (
                      <option
                        value={state?.name}
                        selected={getValues().shippingProvince === state?.name}
                        key={i}
                      >
                        {state?.name}
                      </option>
                    ))}
                </select>

                <span className="error">
                  {errors?.shippingProvince?.message}
                </span>
              </div>
            )}
            {/* city */}
            <div className="w-full">
              <label htmlFor="city" className="Label">
                {t("city")}
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingcity")}
              />
              <span className="error">{errors?.shippingcity?.message}</span>
            </div>
            {/* postal code */}
            <div className="w-full">
              <label htmlFor="postal_code" className="Label">
                {t("postal code")}
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input_field"
                {...register("shippingzipCode")}
              />
              <span className="error">{errors?.shippingzipCode?.message}</span>
            </div>
          </>
        )}

        {/* order note */}
        <textarea
          name="order_note"
          className="input_field w-full min-h-[8rem] max-h-[8rem]"
          placeholder="Comment about your order, ex : delivery instrucrtions"
          {...register("orderNotes")}
        ></textarea>
      </div>

      <OrderSummary
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
        onSubmit={handleSubmit(onSubmit)}
        errors
      />
    </form>
  );
};

export default CheckoutForm;
