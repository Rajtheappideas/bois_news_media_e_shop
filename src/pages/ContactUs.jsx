import React, { useEffect, useRef } from "react";
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

const ContactUs = () => {
  // function handlChange(value) {
  //   setFieldValue("captcha", value);
  // }
  // const { loading } = useSelector((state) => state.basicFeatures);
  // const Content = useSelector((state) => state.getContent);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const captchaRef = useRef(null);

  const { t } = useTranslation();

  // const SignupSchema = yup.object().shape({
  //   email: yup.string().required("email is required").email(),
  //   fname: yup
  //     .string()
  //     .trim("The contact name cannot include leading and trailing spaces")
  //     .required("firstname is required")
  //     .min(3, "too short")
  //     .max(30, "too long")
  //     .matches(
  //       /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
  //       "only contain Latin letters."
  //     ),
  //   lname: yup
  //     .string()
  //     .trim("The contact name cannot include leading and trailing spaces")
  //     .required("lastname is required")
  //     .min(2, "too short")
  //     .max(30, "too long")
  //     .matches(
  //       /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
  //       "only contain Latin letters."
  //     ),
  //   comments: yup
  //     .string()
  //     .required("Comment is required")
  //     .matches(/^[A-Za-z\s\-]+$/g, "That doesn't look Comment")
  //     .trim("The contact name cannot include leading and trailing spaces"),
  //   phone: yup.number().required("A phone number is required"),
  //   captcha: yup.string().required("Check the captcha."),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     fname: "",
  //     lname: "",
  //     email: "",
  //     phone: "",
  //     comments: "",
  //     captcha: "",
  //   },
  //   validationSchema: SignupSchema,
  //   onSubmit: (values) => {
  //     if (
  //       isPossiblePhoneNumber(values.phone) &&
  //       isValidPhoneNumber(values.phone)
  //     ) {
  //       const response = dispatch(
  //         handlePostContactUs({
  //           fname: values.fname,
  //           lname: values.lname,
  //           email: values.email,
  //           phone: values.phone,
  //           comments: values.comments,
  //           signal: AbortControllerRef,
  //         })
  //       );
  //       if (response) {
  //         response.then((res) => {
  //           if (res.payload.status === "success") {
  //             toast.success("Message sent successfully.");
  //             captchaRef.current.props.grecaptcha.reset();
  //             resetForm();
  //           } else {
  //             toast.error(res.payload.message);
  //           }
  //         });
  //       }
  //     } else {
  //       toast.error("Phone number is invalid!!!");
  //     }
  //   },
  // });

  useEffect(() => {
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet title="Contact us | E-shop" />
      <div className="relative md:h-80 h-60">
        <img
          src={require("../assests/images/contact-us.png")}
          alt="contactus"
          className="w-screen h-full object-cover object-left"
          loading="lazy"
        />
        <h1 className="font-bold text-white uppercase md:text-4xl text-2xl text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Contact Us
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
        <div className="md:w-2/3 w-full p-4 rounded-lg border border-borderColor md:space-y-4 space-y-2">
          <h1 className="font-semibold md:text-2xl text-xl text-left">
            {t("Get In Touch")}
          </h1>
          <hr />
          {/* name */}
          <div className="w-full">
            <label className="Label">Name*</label>
            <input
              type="text"
              className="gray_input_field"
              placeholder="Enter your name"
              name="name"
            />
          </div>
          {/* email , phone */}
          <div className="flex items-start w-full lg:flex-row flex-col gap-3">
            <div className="lg:w-1/2 w-full">
              <label className="Label">{t("Email address")}*</label>
              <input
                type="email"
                className="gray_input_field"
                placeholder="abc@gmail.com"
                name="email"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <>
                <label className="Label">{t("Phone")}*</label>
                <PhoneInput
                  country={"us"}
                  countryCodeEditable={false}
                  enableSearch={true}
                  inputProps={{
                    name: "phone",
                  }}
                  // onChange={(value) =>
                  //   setFieldValue("phone", "+".concat(value).trim())
                  // }
                  // value={formik.values.phone}
                  inputStyle={{
                    width: "100%",
                    background: "#EFEFEF",
                    borderRadius: "6px",
                    border: "0",
                    padding: "1.6rem 0 1.6rem 3rem",
                  }}
                  // disabled={loading}
                  jumpCursorToEnd={true}
                  dropdownStyle={{ background: "#EFEFEF" }}
                  buttonStyle={{ border: "0px" }}
                />
              </>
            </div>
          </div>
          {/* message */}
          <label className="Label">{t("Comments")}*</label>
          <textarea
            className="gray_input_field min-h-[8rem] max-h-[10rem]"
            placeholder="message..."
            name="comments"
          />
          <p>{t("Please check the box below to proceed")}.</p>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            // onChange={handlChange}
            ref={captchaRef}
          />{" "}
          <button
            type="submit"
            className="gray_button w-40 h-12"
            // disabled={loading}
          >
            {/* {loading ? t("Submitting").concat("...") : t("Send")} */}
            Send
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
