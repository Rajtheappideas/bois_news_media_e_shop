import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { handleEditProfile } from "../../redux/AuthSlice";
import Schema from "../../schemas/Schema";

const EditProfile = ({ setshowEditProfile }) => {
  const { user, token, loading } = useSelector((state) => state.root.auth);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { profileSchema } = Schema();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fname: user?.fname,
      lname: user?.lname,
      phone: user?.phone,
      civility: user?.civility,
      company: user?.company,
      mobile: user?.mobile,
      country: user?.shippingAddress?.country,
      city: user?.shippingAddress?.city,
      zipCode: user?.shippingAddress?.zipCode,
      address: user?.shippingAddress?.address1,
      province: user?.shippingAddress?.province,
      province: user?.shippingAddress?.province,
    },
  });

  const onSubmit = (data) => {
    const {
      fname,
      lname,
      phone,
      civility,
      address,
      city,
      zipCode,
      mobile,
      company,
      country,
      province,
    } = data;

    if (!isDirty) return;
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error(t("Phone is invalid"));
      return true;
    } else if (
      (getValues("mobile") !== "" && !isPossiblePhoneNumber(phone)) ||
      !isValidPhoneNumber(phone)
    ) {
      toast.remove();
      toast.error(t("Phone is invalid"));
      return true;
    }
    let shippingAddress = {
      address1: address,
      address2: "",
      address3: "",
      zipCode,
      city,
      province,
      country,
    };
    const response = dispatch(
      handleEditProfile({
        fname,
        lname,
        phone,
        civility,
        mobile,
        company,
        shippingAddress,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("Edit profile Successfully."), { duration: 2000 });
        }
      });
    }
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border border-gray-300"
    >
      <p className="heading text-lg md:text-left text-center">Edit Profile</p>
      {/* name */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="first_name" className="Label">
            First name
          </label>
          <input
            type="text"
            placeholder="john"
            className="w-full input_field"
            {...register("fname")}
          />
          <span className="error">{errors?.fname?.message}</span>
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="last_name" className="Label">
            Last name
          </label>
          <input
            type="text"
            placeholder="adam"
            className="w-full input_field"
            {...register("lname")}
          />
          <span className="error">{errors?.lname?.message}</span>
        </div>
      </div>
      {/* email */}
      <div className="w-full">
        <label htmlFor="email" className="Label">
          email
        </label>
        <input
          type="email"
          placeholder="Type here..."
          className="w-full input_field"
          disabled
          value={user?.email}
        />
      </div>
      {/* phone */}
      <div className="w-full">
        <label htmlFor="phone" className="Label">
          phone
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
      {/* mobile */}
      <div className="w-full">
        <label htmlFor="mobile" className="Label">
          mobile
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
      {/* civility */}
      <div className="w-full">
        <label htmlFor="company" className="Label">
          company
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("company")}
        />
        <span className="error">{errors?.company?.message}</span>
      </div>
      {/* civility */}
      <div className="w-full">
        <label htmlFor="civility" className="Label">
          Civility
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("civility")}
        />
        <span className="error">{errors?.civility?.message}</span>
      </div>
      {/* province */}
      <div className="w-full">
        <label htmlFor="province" className="Label">
          province
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("province")}
        />
        <span className="error">{errors?.province?.message}</span>
      </div>
      {/* address */}
      <div className="w-full">
        <label htmlFor="street_address" className="Label">
          address
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("address")}
        />
        <span className="error">{errors?.address?.message}</span>
      </div>
      {/* coutry + city */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="country" className="Label">
            country
          </label>
          <input
            type="text"
            placeholder="country"
            className="w-full input_field"
            {...register("country")}
          />
          <span className="error">{errors?.country?.message}</span>
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="city" className="Label">
            city
          </label>
          <input
            type="text"
            placeholder="city"
            className="w-full input_field"
            {...register("city")}
          />
          <span className="error">{errors?.city?.message}</span>
        </div>
      </div>
      {/* postal code */}
      <div className="w-full">
        <label htmlFor="postal_code" className="Label">
          postal code
        </label>
        <input
          type="number"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("zipCode")}
        />
        <span className="error">{errors?.zipCode?.message}</span>
      </div>
      {/* btn */}
      <div className="flex items-center gap-3">
        <button
          className="gray_button md:h-12 md:w-40 w-1/2"
          disabled={loading}
          type="submit"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setshowEditProfile(false)}
          disabled={loading}
          className="light_gray_button md:h-12 md:w-40 w-1/2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
