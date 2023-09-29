import * as yup from "yup";

export const signupSchema = yup.object({
  fname: yup
    .string()
    .required("FirstName is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "FirstName can only contain Latin letters."
    ),
  lname: yup
    .string()
    .required("LastName is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "LastName can only contain Latin letters."
    ),
  address: yup
    .string()
    .max(200, "Maximum character limit reached")
    .required("address is required")
    .trim(""),
  company: yup.string().max(200, "Maximum character limit reached").trim(""),
  civility: yup
    .string()
    .required("Civility is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Civility can only contain Latin letters."
    ),
  zipCode: yup
    .string()
    .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, "Enter valid code")
    .required("zipcode is required"),
  country: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required")
    .trim(""),
  city: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required")
    .trim(""),
  phone: yup.string().required("phone is required"),
  mobile: yup.string(),
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
      "Minimum 8 characters, at least one special character, at least one digit"
    )
    .trim(),
  province: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "province can only contain Latin letters."
    )
    .trim(""),
});

export const profileSchema = yup.object({
  fname: yup
    .string()
    .required("FirstName is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "FirstName can only contain Latin letters."
    ),
  lname: yup
    .string()
    .required("LastName is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "LastName can only contain Latin letters."
    ),
  address: yup
    .string()
    .max(200, "Maximum character limit reached")
    .required("address is required")
    .trim(""),
  company: yup.string().max(200, "Maximum character limit reached").trim(""),
  civility: yup
    .string()
    .required("Civility is required")
    .trim()
    .max(60, "Max character limit reached")
    .min(2, "minimum two character required")
    .typeError("Only characters allowed")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Civility can only contain Latin letters."
    ),
  zipCode: yup
    .string()
    .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, "Enter valid code")
    .required("zipcode is required"),
  country: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required")
    .trim(""),
  city: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required")
    .trim(""),
  phone: yup.string().required("phone is required"),
  mobile: yup.string(),
  province: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "province can only contain Latin letters."
    )
    .trim(""),
});

export const AddressSchema = yup.object({
  address1: yup
    .string()
    .max(200, "Maximum character limit reached")
    .required("address  1 is required"),
  address2: yup.string().max(200, "Maximum character limit reached"),
  address3: yup.string().max(200, "Maximum character limit reached"),
  zipCode: yup
    .string()
    .matches(/^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/, "Enter valid code")
    .required("zipcode is required"),
  country: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required"),
  city: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "country can only contain Latin letters."
    )
    .required("country is required"),
  province: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "province can only contain Latin letters."
    ),
});
