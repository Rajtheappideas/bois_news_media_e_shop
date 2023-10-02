import React from "react";
import { useTranslation } from "react-i18next";

const CheckoutForm = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full md:space-y-5 space-y-3">
      <p className="bg-darkBlue text-white text-left p-4 md:text-lg font-semibold">
        {t("Billing Information")}
      </p>
      {/* name */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="first_name" className="Label">
            {t("First name")}
          </label>
          <input
            type="text"
            placeholder="john"
            className="w-full input_field"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="last_name" className="Label">
            {t("Last name")}
          </label>
          <input
            type="text"
            placeholder="adam"
            className="w-full input_field"
          />
        </div>
      </div>
      {/* company name */}
      <div className="w-full">
        <label htmlFor="company_name" className="Label">
          {t("Company name")} (optional)
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* field of activity */}
      <div className="w-full">
        <label htmlFor="field_of_activity" className="Label">
          {t("Field of activity")} (optional)
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
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
        />
      </div>
      {/* street */}
      <div className="w-full">
        <label htmlFor="street_address" className="Label">
          {t("street address")}
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* state */}
      <div className="w-full">
        <label htmlFor="state" className="Label">
          {t("state")}
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
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
        />
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
        />
      </div>
      {/* phone + email */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="phone" className="Label">
            {t("phone")}
          </label>
          <input
            type="number"
            placeholder="37366873635"
            className="w-full input_field"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="email" className="Label">
            {t("email")}
          </label>
          <input
            type="email"
            placeholder="adam@gmail.com"
            className="w-full input_field"
          />
        </div>
      </div>
      {/* vat number */}
      <div className="w-full">
        <label htmlFor="vat_number" className="Label">
          {t("VAT number")} (optional)
        </label>
        <input
          type="number"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* puchrse order */}
      <div className="w-full">
        <label htmlFor="purchase_order" className="Label">
          {t("purchase order")} (optional)
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* order note */}
      <textarea
        name="order_note"
        className="input_field w-full min-h-[8rem] max-h-[8rem]"
        placeholder="Comment about your order, ex : delivery instrucrtions"
      ></textarea>
    </div>
  );
};

export default CheckoutForm;
