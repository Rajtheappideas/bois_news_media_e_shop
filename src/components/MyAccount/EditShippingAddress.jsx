import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleChangeUserAddress } from "../../redux/AuthSlice";
import ValidationSchema from "../../validations/ValidationSchema";

const EditShippingAddress = ({ setActiveEditAddress }) => {
  const { addresses, token, addressLoading } = useSelector(
    (state) => state.root.auth
  );
  const shippingAddress = addresses?.shippingAddress;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { AddressSchema } = ValidationSchema();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      address1: shippingAddress?.address1,
      address2: shippingAddress?.address2,
      address3: shippingAddress?.address3,
      zipCode: shippingAddress?.zipCode,
      province: shippingAddress?.province,
      country: shippingAddress?.country,
      city: shippingAddress?.city,
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
          toast.success(t("address edited successfully."), { duration: 2000 });
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:space-y-5 space-y-3 border border-gray-300 md:p-4 p-2"
    >
      <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
        <span>{t("Shipping address")}</span>
        <AiOutlineClose
          onClick={() => setActiveEditAddress("")}
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
      {/* province */}
      <div className="w-full">
        <label htmlFor="province" className="Label">
          {t("province")}
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("province")}
        />
        <span className="error">{errors?.province?.message}</span>
      </div>
      {/* country */}
      <div className="w-full">
        <label htmlFor="country" className="Label">
          {t("country")}
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
          {...register("country")}
        />
        <span className="error">{errors?.country?.message}</span>
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

export default EditShippingAddress;
