import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { handleChangeUserAddress } from "../../redux/AuthSlice";

const EditBillingAddress = ({ setActiveEditAddress }) => {
  const { addresses, token, addressLoading } = useSelector(
    (state) => state.root.auth
  );
  const billingAddress = addresses?.billingAddress;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const editAddressSchema = yup.object({
    address1: yup
      .string()
      .max(200, t("Maximum character limit reached"))
      .required(t("address  1 is required")),
    address2: yup.string().max(200, t("Maximum character limit reached")),
    address3: yup.string().max(200, t("Maximum character limit reached")),
    zipCode: yup
      .string()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Enter valid code")
      .required(t("zipcode is required"))
      .trim(""),
    country: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("country can only contain Latin letters.")
      )
      .required(t("country is required")),
    city: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("country can only contain Latin letters.")
      )
      .required(t("country is required")),
    province: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("province can only contain Latin letters.")
      ),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(editAddressSchema),
    defaultValues: {
      address1: billingAddress?.address1,
      address2: billingAddress?.address2,
      address3: billingAddress?.address3,
      zipCode: billingAddress?.zipCode,
      province: billingAddress?.province,
      country: billingAddress?.country,
      city: billingAddress?.city,
    },
  });

  const onSubmit = (data) => {
    const { address1, address2, address3, city, zipCode, province, country } =
      data;

    if (!isDirty) return;
    const response = dispatch(
      handleChangeUserAddress({
        addressType: "billing",
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
          toast.success(t("Address edited Successfully."), { duration: 2000 });
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:space-y-5 space-y-3 border border-gray-300 md:p-4 p-2"
    >
      <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
        <span>Billing Address</span>
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
          address 1
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
          address 2
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
          address 3
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
          city
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
          postal code
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
      {/* country */}
      <div className="w-full">
        <label htmlFor="country" className="Label">
          country
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
        {addressLoading ? "Saving..." : "Save address"}
      </button>
    </form>
  );
};

export default EditBillingAddress;
