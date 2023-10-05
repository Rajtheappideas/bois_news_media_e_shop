import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleChangeUserAddress } from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import ValidationSchema from "../../validations/ValidationSchema";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Country, State } from "country-state-city";

const ShippingAddress = ({ setActiveAddress }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showStateField, setShowStateField] = useState(true);

  const { user, token, addressLoading, addresses } = useSelector(
    (state) => state.root.auth
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { AddressSchema } = ValidationSchema(showStateField);

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      address1: "",
      address2: "",
      address3: "",
      zipCode: "",
      province: "",
      country: "",
      city: "",
    },
  });

  const onSubmit = (data) => {
    const { address1, address2, address3, city, zipCode, province, country } =
      data;

    if (!isDirty) return;
    const response = dispatch(
      handleChangeUserAddress({
        addressType: "shipping",
        address1,
        address2,
        address3,
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
          toast.success(t("address added successfully."), { duration: 2000 });
        }
      });
    }
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
    return () => {
      abortApiCall();
    };
  }, []);

  useEffect(() => {
    let findCountry = "";
    findCountry = Country.getAllCountries().find(
      (c) => c.name === getValues("country")
    );
    if (getValues("country") === "") setShowStateField(true);
    else if (
      State.getStatesOfCountry(findCountry?.isoCode).length > 0 &&
      getValues("country") !== ""
    ) {
      resetField("province", "");
      setSelectedCountry(findCountry?.name);
      setStates(State.getStatesOfCountry(findCountry?.isoCode));
      !showStateField && setShowStateField(true);
    } else {
      setShowStateField(false);
    }
  }, [watch("country")]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:space-y-5 space-y-3 border border-gray-300 md:p-4 p-2"
    >
      <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
        <span>{t("Billing address")}</span>
        <AiOutlineClose
          onClick={() => setActiveAddress("")}
          role="button"
          className="mr-2 md:h-8 md:w-8 h-6 w-6 bg-darkBlue rounded-full text-white p-1"
        />{" "}
      </p>
      {/* name */}
      {/* <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
      <div className="md:w-1/2 w-full">
        <label htmlFor="first_name" className="Label">
          First name
        </label>
        <input
          type="text"
          placeholder="john"
          className="w-full input_field"
        />
      </div>
      <div className="md:w-1/2 w-full">
        <label htmlFor="last_name" className="Label">
          Last name
        </label>
        <input
          type="text"
          placeholder="adam"
          className="w-full input_field"
        />
      </div>
    </div> */}
      {/* company name */}
      {/* <div className="w-full">
      <label htmlFor="company_name" className="Label">
        Company name (optional)
      </label>
      <input
        type="text"
        placeholder="Type here..."
        className="w-full input_field"
      />
    </div> */}
      {/* address 1*/}
      <div className="w-full">
        <label htmlFor="address_1" className="Label">
          {t("address")} 1
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("address1")}
        />
        <span className="error">{errors?.address1?.message}</span>
      </div>
      {/* address 2*/}
      <div className="w-full">
        <label htmlFor="address_2" className="Label">
          {t("address")} 2
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("address2")}
        />
        <span className="error">{errors?.address2?.message}</span>
      </div>

      {/* address 3*/}
      <div className="w-full">
        <label htmlFor="address_3" className="Label">
          {t("address")} 3
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("address3")}
        />
        <span className="error">{errors?.address3?.message}</span>
      </div>
      {/* country */}
      <div className="w-full">
        <label htmlFor="country" className="Label">
          {t("country")}
        </label>
        <select name="country" {...register("country")} className="input_field">
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
          placeholder="Type here..."
          className="w-full input_field"
          {...register("country")}
        /> */}
        <span className="error">{errors?.country?.message}</span>
      </div>
      {/* province */}
      {showStateField && (
        <div className="w-full">
          <label htmlFor="province" className="Label">
            {t("state")}
          </label>
          <select
            name="state"
            {...register("province")}
            className="input_field"
          >
            <option label="Select country"></option>
            {states.length > 0 &&
              states.map((state, i) => (
                <option value={state?.name} key={i}>
                  {state?.name}
                </option>
              ))}
          </select>
          {/* <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("province")}
        /> */}
          <span className="error">{errors?.province?.message}</span>
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
          {...register("city")}
        />
        <span className="error">{errors?.city?.message}</span>
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
          {...register("zipCode")}
        />
        <span className="error">{errors?.zipCode?.message}</span>
      </div>
      {/* btn */}
      <button
        disabled={addressLoading}
        className="gray_button capitalize md:w-60 w-full md:h-12 h-10"
      >
        {addressLoading ? t("Saving").concat("...") : t("Save address")}
      </button>
    </form>
  );
};

export default ShippingAddress;
