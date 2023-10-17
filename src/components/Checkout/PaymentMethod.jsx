import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleChangeDiscount,
  handleChangePromoCodeRemove,
  handleChangeShipping,
  handleChangeTax,
  handleCreateOrder,
} from "../../redux/CartSlice";

const PaymentMethod = ({
  setActiveComponent,
  activeComponent,
  clientSecret,
}) => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((s) => s.root.auth);

  const { t } = useTranslation();
  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const handleCreateOrderFunction = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    elements.submit();
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });

    if (paymentIntent?.status === "succeeded") {
      const response = dispatch(
        handleCreateOrder({
          paymentIntentId: paymentIntent?.id,
          token,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.status === "success") {
            toast.success("Payment successful");
            setActiveComponent("success");
            dispatch(handleCalculateSubTotal());
            dispatch(handleChangeTax(0));
            dispatch(handleChangeShipping(0));
            dispatch(handleChangeDiscount(0));
            dispatch(handleCalculateTotal());
            dispatch(handleChangePromoCodeRemove());
          }
        });
      }
    } else if (paymentIntent?.status === "canceled") {
      toast.error("Your payment is cancelled!!!");
    }
    if (error) {
      toast.remove();
      toast.error(error?.message, { duration: 4000 });
    }

    setLoading(false);
  };
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  return (
    <form className="w-full md:space-y-5 space-y-3 flex items-start gap-3">
      <div className="md:space-y-5 space-y-3 w-9/12">
        <p className="bg-darkBlue text-white text-left p-4 md:text-lg font-semibold">
          {t("Card Details")}
        </p>
        {/* <ul className="md:space-y-4 space-y-2">
          <li className="flex items-center gap-3">
            <input
              type="radio"
              name="payment_method"
              id="credit_card"
              className="md:w-5 md:h-5"
              defaultChecked
            />
            <label htmlFor="credit_card" className="Label">
              <span>{t("Payment by credit card")}</span>
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
              <span>{t("Bank transfer")}</span>
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
              <span>{t("Payment by check")}</span>
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
              <span>{t("Payment by administrative mandate")}</span>
            </label>
          </li>
        </ul> */}
        <PaymentElement options={{ layout: "accordion" }} />
        {/* <hr />
        <div className="w-full flex items-center gap-3">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="w-6 h-6 rounded-lg"
          />
          <label htmlFor="terms">
            {t("I have read and accept the")}{" "}
            <Link to="/terms" className="text-darkBlue font-semibold">
              {t("terms & conditions")}.
            </Link>
          </label>
        </div> */}
      </div>
      <OrderSummary
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
        handleCreateOrder={handleCreateOrderFunction}
        loading={loading}
      />{" "}
    </form>
  );
};

export default PaymentMethod;
