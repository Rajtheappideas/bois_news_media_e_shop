import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { MdCall, MdLocationOn } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostUrl } from "../BaseUrl";
import Schema from "../schemas/Schema";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const captchaRef = useRef(null);

  const { t } = useTranslation();

  const { contactUsSchema } = Schema();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(contactUsSchema),
  });

  const onSubmit = async (data) => {
    const { phone, email, comments, name } = data;

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
    setLoading(true);
    try {
      const { data } = await PostUrl("contact", {
        data: { email, name, phone, comments },
      });
      setLoading(false);
      toast.success(data?.message);
      reset();
      captchaRef?.current?.props?.grecaptcha?.reset();
      resetField("phone", undefined);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  function handleChange(value) {
    setValue("captcha", value);
  }
  useEffect(() => {
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Contact us")} | E-shop</title>
      </Helmet>
      <div className="relative md:h-80 h-60">
        <img
          src={require("../assests/images/contact-us.png")}
          alt="contactus"
          className="w-screen h-full object-cover object-left"
          loading="lazy"
        />
        <h1 className="font-bold text-white uppercase md:text-4xl text-2xl text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          {t("Contact us")}
        </h1>
      </div>
      <section className="Container mx-auto flex md:flex-row flex-col items-start justify-center gap-5 py-5">
        {/* left side div */}
        <div className="md:w-1/3 w-full md:space-y-5 space-y-2 rounded-lg border border-gray-200">
          <img
            src={require("../assests/images/contact.jpg")}
            alt="contact-us"
            className="h-fit w-full object-contain object-center"
          />
          <div className="md:space-y-5 space-y-2 xl:px-10 px-3 relative">
            {/* address */}
            <div className="flex items-start gap-x-2">
              <p>
                <MdLocationOn className="h-5 w-5 text-darkGray inline-block" />
              </p>
              <p>
                <span className="font-semibold inline-block">
                  41 Rue du Télégraphe 75020 Paris{" "}
                </span>
              </p>
            </div>
            {/* call */}
            <div className="flex items-start gap-x-2">
              <p>
                <MdCall className="h-5 w-5 text-darkGray inline-block" />
              </p>
              <p>
                <a
                  href="tel:33 (0)1 40 33 33 30"
                  className="font-semibold block"
                >
                  +33 (0)1 40 33 33 30{" "}
                </a>
              </p>
            </div>
            {/* mail */}
            <div className="flex items-center flex-wrap gap-x-2 md:pb-10 pb-5">
              <GrMail size={20} className="text-darkGray min-w-[1rem]" />
              <a
                href="mailto:contact@boisnewsmedia.com"
                className="font-semibold"
              >
                contact@boisnewsmedia.com
              </a>
            </div>
          </div>
        </div>
        {/* right side div */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-2/3 w-full p-4 rounded-lg border border-borderColor md:space-y-4 space-y-2"
        >
          <h1 className="font-semibold md:text-2xl text-xl text-left">
            {t("Get In Touch")}
          </h1>
          <hr />
          {/* name */}
          <div className="w-full">
            <label className="Label">{t("Name")}*</label>
            <input
              type="text"
              className="gray_input_field"
              placeholder="Enter your name"
              name="name"
              {...register("name")}
            />
            <span className="error">{errors?.name?.message}</span>
          </div>
          {/* email , phone */}
          <div className="flex items-start w-full lg:flex-row flex-col gap-3">
            <div className="lg:w-1/2 w-full">
              <label className="Label">{t("Email")}*</label>
              <input
                type="email"
                className="gray_input_field"
                placeholder="abc@gmail.com"
                name="email"
                {...register("email")}
              />
              <span className="error">{errors?.email?.message}</span>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="Label">{t("phone")}*</label>

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
                    value={getValues().phone}
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
          </div>
          {/* message */}
          <label className="Label">{t("Comments")}*</label>
          <textarea
            className="gray_input_field min-h-[8rem] max-h-[10rem]"
            placeholder="message..."
            name="comments"
            {...register("comments")}
          />
          <span className="error">{errors?.comments?.message}</span>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={handleChange}
            ref={captchaRef}
          />{" "}
          <p className="error">{errors?.captcha?.message}.</p>
          <button
            type="submit"
            className="gray_button w-40 h-12"
            disabled={loading}
          >
            {loading ? t("Submitting").concat("...") : t("Send")}
          </button>
        </form>
      </section>
    </>
  );
};

export default ContactUs;
