import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowSignin,
  handleChangeShowSignup,
  handleSuccess,
} from "../../redux/globalStates";
import {
  handleGetUserAddress,
  handleRegisterUser,
} from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import ValidationSchema from "../../validations/ValidationSchema";
import { Country, State } from "country-state-city";
import { useState } from "react";

const Signup = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showStateField, setShowStateField] = useState(true);

  const dispatch = useDispatch();

  const { showSignup } = useSelector((state) => state.root.globalStates);
  const { loading } = useSelector((state) => state.root.auth);

  const signupRef = useRef(null);

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { signupSchema } = ValidationSchema();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    const {
      fname,
      lname,
      email,
      phone,
      civility,
      password,
      address,
      city,
      zipCode,
      province,
      country,
      mobile,
      company,
    } = data;
    let shippingAddress = {
      address1: address,
      address2: "",
      address3: "",
      zipCode,
      city,
      province,
      country,
    };
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error(t("phone is invalid"));
      return true;
    } else if (
      (getValues("mobile") !== "" && !isPossiblePhoneNumber(phone)) ||
      !isValidPhoneNumber(phone)
    ) {
      toast.remove();
      toast.error(t("phone is invalid"));
      return true;
    }

    const response = dispatch(
      handleRegisterUser({
        fname,
        lname,
        email,
        phone,
        civility,
        password,
        mobile,
        company,
        shippingAddress,
        signal: AbortControllerRef,
      }),
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("sign up successfully"));
          dispatch(handleSuccess());
          dispatch(handleChangeShowSignup(false));
          dispatch(handleGetUserAddress({ token: res?.payload?.token }));
        }
      });
    }
  };

  // useEffect(() => {
  //   if (showSignup) {
  //     window.document.body.style.overflow = "hidden";
  //   }
  //   const handleClickOutside = (event) => {
  //     if (
  //       signupRef.current &&
  //       !signupRef.current.contains(event?.target) &&
  //       showSignup
  //     ) {
  //       dispatch(handleChangeShowSignup(false));
  //       window.document.body.style.overflow = "unset";
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, [handleClickOutside, showSignup]);

  function handleClickOutside() {
    dispatch(handleChangeShowSignup(false));
    window.document.body.style.overflow = "unset";
  }

  useEffect(() => {
    setCountries(Country.getAllCountries());

    return () => {
      abortApiCall();
      window.document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    let findCountry = "";
    findCountry = Country.getAllCountries().find(
      (c) => c.name === getValues("country"),
    );
    if (getValues("country") === "") setShowStateField(true);
    else if (
      State.getStatesOfCountry(findCountry?.isoCode).length > 0 &&
      getValues("country") !== ""
    ) {
      resetField("province", "");
      setStates(State.getStatesOfCountry(findCountry?.isoCode));
      !showStateField && setShowStateField(true);
    } else {
      setShowStateField(false);
    }
  }, [watch("country")]);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 overflow-y-scroll hide_scrollbar">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={signupRef}
        className="absolute scrollbar z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-10 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            {t("Create your account")}
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              dispatch(handleChangeShowSignup(false));
            }}
          />
        </div>
        {/* name */}
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="fname" className="Label">
              {t("first name")}
            </label>
            <input
              type="text"
              className="input_field"
              placeholder={t("first name")}
              {...register("fname")}
            />
            <span className="error">{errors?.fname?.message}</span>
          </div>
          <div className="w-1/2">
            <label htmlFor="lname" className="Label">
              {t("last name")}
            </label>
            <input
              type="text"
              className="input_field"
              placeholder={t("last name")}
              {...register("lname")}
            />
            <span className="error">{errors?.lname?.message}</span>
          </div>
        </div>
        {/* email */}
        <div>
          <label htmlFor="email" className="Label">
            {t("E-mail")}
          </label>
          <input
            type="email"
            className="input_field"
            placeholder="hello@gmail.com"
            {...register("email")}
          />
          <span className="error">{errors?.email?.message}</span>
        </div>
        {/* phone */}
        <div>
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
        {/* mobile */}
        <div>
          <label htmlFor="mobile" className="Label">
            {t("mobile")}
          </label>
          <Controller
            name="mobile"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={"in"}
                onChange={(value) => {
                  onChange((e) => {
                    setValue("mobile", "+".concat(value));
                  });
                }}
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
        {/* company name */}
        <div>
          <label htmlFor="company" className="Label">
            {t("company name")}
          </label>
          <input
            type="text"
            name="company"
            {...register("company")}
            className="input_field"
          />

          <span className="error">{errors?.company?.message}</span>
        </div>
        {/* civility */}
        <div>
          <label htmlFor="civility" className="Label">
            {t("civility")}
          </label>
          <select
            {...register("civility")}
            name="civility"
            className="input_field"
          >
            <option label="Choose civility"></option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
          </select>

          <span className="error">{errors?.civility?.message}</span>
        </div>
        {/* country */}
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="country" className="Label">
              {t("country")}
            </label>
            <select
              name="country"
              {...register("country")}
              className="input_field"
            >
              <option label="Select country"></option>
              {countries.length > 0 &&
                countries.map((country, i) => (
                  <option value={country?.name} key={i}>
                    {country?.name}
                  </option>
                ))}
            </select>
            {/* <input
              type="text"
              {...register("country")}
              className="input_field"
              placeholder="country"
            /> */}
            <span className="error">{errors?.country?.message}</span>
          </div>

          <div className="w-1/2">
            <label htmlFor="city" className="Label">
              city
            </label>
            <input
              type="text"
              {...register("city")}
              className="input_field"
              placeholder="city"
            />
            <span className="error">{errors?.city?.message}</span>
          </div>
        </div>
        {/* province */}
        {showStateField && (
          <div>
            <label htmlFor="province" className="Label">
              {t("province")}
            </label>
            {/* <input
              type="text"
              name="province"
              {...register("province")}
              className="input_field"
            /> */}
            <select
              name="state"
              {...register("province")}
              className="input_field"
            >
              <option label="Select province"></option>
              {states.length > 0 &&
                states.map((state, i) => (
                  <option value={state?.name} key={i}>
                    {state?.name}
                  </option>
                ))}
            </select>

            <span className="error">{errors?.province?.message}</span>
          </div>
        )}
        {/* address */}
        <div>
          <label htmlFor="address" className="Label">
            {t("address")}
          </label>
          <input
            type="text"
            {...register("address")}
            className="input_field"
            placeholder="address"
          />
          <span className="error">{errors?.address?.message}</span>
        </div>

        {/* postal code */}
        <div>
          <label htmlFor="postalCode" className="Label">
            {t("postal code")}
          </label>
          <input
            type="number"
            className="input_field"
            placeholder="postal code"
            {...register("zipCode")}
          />
          <span className="error">{errors?.zipCode?.message}</span>
        </div>
        {/* password */}
        <div>
          <label htmlFor="password" className="Label">
            {t("password")}
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
            {...register("password")}
          />
          <span className="error">{errors?.password?.message}</span>
        </div>
        {/* btn */}
        <button type="submit" disabled={loading} className="gray_button w-full">
          {loading ? t("Registering").concat("...") : t("register")}
        </button>
        {/* sign in link */}
        <p className="text-center">
          {t("Already have an account")}?{" "}
          <span
            onClick={() => {
              dispatch(handleChangeShowSignin(true));
              dispatch(handleChangeShowSignup(false));
            }}
            className="text-darkBlue font-semibold cursor-pointer"
          >
            {t("login")}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
