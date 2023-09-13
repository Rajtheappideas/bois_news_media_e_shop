import React from "react";
import { Link } from "react-router-dom";

const PaymentMethod = () => {
  return (
    <div className="w-full md:space-y-5 space-y-3">
      <p className="bg-darkBlue text-white text-left p-4 md:text-lg font-semibold">
        Payment method
      </p>
      <ul className="md:space-y-4 space-y-2">
        <li className="flex items-center gap-3">
          <input
            type="radio"
            name="payment_method"
            id="credit_card"
            className="md:w-5 md:h-5"
            defaultChecked
          />
          <label htmlFor="credit_card" className="Label">
            <span>Payment by credit card</span>
          </label>
        </li>
        <li className="flex items-center gap-3">
          <input
            type="radio"
            name="payment_method"
            id="paypal"
            className="md:w-5 md:h-5"
            defaultChecked
          />
          <label htmlFor="paypal" className="Label">
            <span>Paypal</span>
          </label>
        </li>
        <li className="flex items-center gap-3">
          <input
            type="radio"
            name="payment_method"
            id="bank_transfer"
            className="md:w-5 md:h-5"
            defaultChecked
          />
          <label htmlFor="bank_transfer" className="Label">
            <span>Bank transfer</span>
          </label>
        </li>
        <li className="flex items-center gap-3">
          <input
            type="radio"
            name="payment_method"
            id="pay_by_check"
            className="md:w-5 md:h-5"
            defaultChecked
          />
          <label htmlFor="pay_by_check" className="Label">
            <span>Payment by check</span>
          </label>
        </li>
        <li className="flex items-center gap-3">
          <input
            type="radio"
            name="payment_method"
            id="pay_by_admin"
            className="md:w-5 md:h-5"
            defaultChecked
          />
          <label htmlFor="pay_by_admin" className="Label">
            <span>Payment by administrative mandate</span>
          </label>
        </li>
      </ul>
      <hr />
      <div className="w-full flex items-center gap-3">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          className="w-6 h-6 rounded-lg"
        />
        <label htmlFor="terms">
          I have read and accept the{" "}
          <Link to="/terms" className="text-darkBlue font-semibold">terms & conditions.</Link>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
