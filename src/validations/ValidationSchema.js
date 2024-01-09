import * as yup from "yup";
import { useTranslation } from "react-i18next";

const ValidationSchema = (required, required2) => {
  const { t } = useTranslation();
  const signupSchema = yup.object({
    fname: yup
      .string()
      .required(t("firstName is required"))
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    lname: yup
      .string()
      .required(t("lastName is required"))
      .trim()
      .max(60, t(t("max character limit reached")))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    address: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .required(t("address is required")),
    company: yup.string().max(200, t("maximum character limit reached")),
    civility: yup
      .string()
      .required(t("civility is required"))
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed")),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    country: yup.string().required(t("country is required")),
    city: yup.string().required(t("country is required")),
    phone: yup.string().required("phone is required"),
    mobile: yup.string(),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^<>&*])[a-zA-Z0-9!@#$%^<>&*]{8,20}$/,
        t(
          "Minimum 8 characters, at least one special character (!@#$%^<>&*), at least one digit"
        )
      ),
    province: required
      ? yup.string()
      : yup.string().required(t("province is required")),
  });

  const checkoutSchema = yup.object({
    billingFname: yup
      .string()
      .required(t("firstName is required"))
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    shippingFname: yup
      .string()
      .required(t("firstName is required"))
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    billingLname: yup
      .string()
      .required(t("lastName is required"))
      .trim()
      .max(60, t(t("max character limit reached")))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    shippingLname: yup
      .string()
      .required(t("lastName is required"))
      .trim()
      .max(60, t(t("max character limit reached")))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    billingAddress1: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .required(t("address is required")),
    shippingAddress1: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .required(t("address is required")),
    billingCompanyName: yup
      .string()
      .max(200, t("maximum character limit reached")),
    shippingCompanyName: yup
      .string()
      .max(200, t("maximum character limit reached")),
    billingCompanyName: yup
      .string()
      .max(200, t("maximum character limit reached")),
    billingzipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    shippingzipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    shippingcountry: yup.string().required(t("country is required")),
    billingcountry: yup.string().required(t("country is required")),
    shippingcity: yup.string().required(t("country is required")),
    billingcity: yup.string().required(t("country is required")),
    billingProvince: required
      ? yup.string()
      : yup.string().required(t("province is required")),
    shippingProvince: required2
      ? yup.string()
      : yup.string().required(t("province is required")),
    phone: yup.string().required("phone is required"),
    email: yup.string().email().required("Email is required"),
    // fieldOfActivity: yup.string(),
    VAT: yup.string().notRequired(),
    orderNotes: yup.string().notRequired(),
    purchaseOrder: yup.string().notRequired(),
  });

  const profileSchema = yup.object({
    fname: yup
      .string()
      .required("FirstName is required")
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    lname: yup
      .string()
      .required("LastName is required")
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    address: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .required(t("address is required")),
    company: yup.string().max(200, t("maximum character limit reached")),
    civility: yup
      .string()
      .required(t("civility is required"))
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed")),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    country: yup.string().required(t("country is required")),
    city: yup.string().required(t("country is required")),
    phone: yup.string().required(t("phone is required")),
    mobile: yup.string(),
    province: required
      ? yup.string()
      : yup.string().required(t("province is required")),
  });

  const AddressSchema = yup.object({
    address1: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .required(t("address is required")),
    address2: yup.string().max(200, t("maximum character limit reached")),
    address3: yup.string().max(200, t("maximum character limit reached")),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    country: yup.string().required(t("country is required")),
    city: yup.string().required(t("city is required")),
    province: required
      ? yup.string()
      : yup.string().required(t("province is required")),
  });

  const ResetPasswordSchema = yup.object({
    password: yup
      .string()
      .required(t("password is required"))
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        t(
          "Minimum 8 characters, at least one special character, at least one digit"
        )
      ),
    confirmPassword: yup
      .string()
      .required(t("confirm password is required"))
      .oneOf([yup.ref("password"), null], t("password not match")),
  });

  const changePasswordSchema = yup.object({
    oldPassword: yup.string().required(t("old password is required")).trim(),
    newPassword: yup
      .string()
      .required(t("new password is required"))
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        t(
          "Minimum 8 characters, at least one special character, at least one digit"
        )
      ),
    confirmPassword: yup
      .string()
      .required(t("confirm password is required"))
      .oneOf([yup.ref("newPassword"), null], t("password not match")),
  });

  const contactUsSchema = yup.object().shape({
    email: yup.string().required(t("email is required")).email(),
    name: yup
      .string()
      .required(t("name is required"))
      .min(2, t("too short"))
      .max(30, t("too long"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        t("only contain Latin letters")
      ),

    comments: yup.string().required(t("comment is required")).trim(""),
    phone: yup.string().required(t(t("phone is required"))),
    captcha: yup.string().required(t("check the captcha.")),
  });

  return {
    signupSchema,
    profileSchema,
    AddressSchema,
    ResetPasswordSchema,
    changePasswordSchema,
    contactUsSchema,
    checkoutSchema,
  };
};

export default ValidationSchema;
