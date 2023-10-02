import * as yup from "yup";
import { useTranslation } from "react-i18next";

const schemas = () => {
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
      .required(t("address is required"))
      .trim(""),
    company: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .trim(""),
    civility: yup
      .string()
      .required(t("civility is required"))
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    country: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required"))
      .trim(""),
    city: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required"))
      .trim(""),
    phone: yup.string().required("phone is required"),
    mobile: yup.string(),
    email: yup.string().email().required("Email is required").trim(),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        t(
          "Minimum 8 characters, at least one special character, at least one digit"
        )
      )
      .trim(),
    province: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "only contain latin letters"
      )
      .trim(""),
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
      .trim()
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
      .required(t("address is required"))
      .trim(""),
    company: yup
      .string()
      .max(200, t("maximum character limit reached"))
      .trim(""),
    civility: yup
      .string()
      .required(t("civility is required"))
      .trim()
      .max(60, t("max character limit reached"))
      .min(2, t("minimum two character required"))
      .typeError(t("only characters allowed"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
    zipCode: yup
      .string()
      .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, t("enter valid code"))
      .required(t("zipcode is required")),
    country: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required"))
      .trim(""),
    city: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required"))
      .trim(""),
    phone: yup.string().required(t("phone is required")),
    mobile: yup.string(),
    province: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .trim(""),
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
    country: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required")),
    city: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      )
      .required(t("country is required")),
    province: yup
      .string()
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        t("only contain latin letters")
      ),
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
      )
      .trim(),
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
      )
      .trim(),
    confirmPassword: yup
      .string()
      .required(t("confirm password is required"))
      .oneOf([yup.ref("newPassword"), null], t("password not match")),
  });

  const contactUsSchema = yup.object().shape({
    email: yup.string().required(t("email is required")).email(),
    name: yup
      .string()
      .trim("")
      .required(t("name is required"))
      .min(2, t("too short"))
      .max(30, t("too long"))
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        t("only contain Latin letters")
      ),

    comments: yup
      .string()
      .required(t("comment is required"))
      .matches(/^[A-Za-z\s\-]+$/g)
      .trim(""),
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
  };
};

export default schemas;
