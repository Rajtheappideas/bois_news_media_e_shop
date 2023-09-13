import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const BillingAddress = ({ setActiveAddress }) => {
  return (
    <div className="w-full md:space-y-5 space-y-3 border border-gray-300 md:p-4 p-2">
      <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
        <span>Order Details</span>
        <AiOutlineClose
          onClick={() => setActiveAddress("")}
          role="button"
          className="mr-2 md:h-8 md:w-8 h-6 w-6 bg-darkBlue rounded-full text-white p-1"
        />{" "}
      </p>
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
      </div>
      {/* company name */}
      <div className="w-full">
        <label htmlFor="company_name" className="Label">
          Company name (optional)
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
          Field of activity (optional)
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
          country
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
          street address
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
          state
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
          city
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
          postal code
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
            phone
          </label>
          <input
            type="number"
            placeholder="37366873635"
            className="w-full input_field"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="email" className="Label">
            email
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
          VAT number (optional)
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
          purchase order (optional)
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* btn */}
      <button className="gray_button capitalize md:w-60 w-full md:h-12 h-10">
        save address
      </button>
    </div>
  );
};

export default BillingAddress;
