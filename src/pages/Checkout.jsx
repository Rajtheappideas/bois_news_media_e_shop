import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import Success from "../components/Success";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChangeShowSignin } from "../redux/globalStates";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
} from "../redux/CartSlice";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const Checkout = () => {
  const [activeComponent, setActiveComponent] = useState("checkout_form");
  const [clientSecret, setClientSecret] = useState(
    "pi_3O0iJRIEhdCVsY1P0Vh7NViH_secret_xV9tyPc7JtGcQULL2Dh2Ckor6"
  );
  const [stripePromise, setStripePromise] = useState(null);

  const { user } = useSelector((state) => state.root.auth);
  const { cart, checkoutLoading } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { abortApiCall } = useAbortApiCall();

  const { t } = useTranslation();

  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
    if (cart && cart?.length === 0) {
      navigate("/shop");
    }
    if (user !== null) {
      dispatch(handleCalculateSubTotal());
      dispatch(handleCalculateTotal());
      setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PK_TEST));
    }

    return () => abortApiCall();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Checkout")} | E-shop</title>
      </Helmet>
      {activeComponent === "success" && (
        <Success
          title={t("Thank you !")}
          description={t("Your order has been received.")}
          btnText={t("continue shopping")}
          link="/shop"
        />
      )}

      <div className="Container lg:py-10 py-5 md:space-y-5 space-y-3">
        {activeComponent !== "success" && (
          <div className="w-full flex xl:flex-row flex-col items-start lg:gap-6 gap-3">
            {activeComponent === "checkout_form" && (
              <CheckoutForm
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
                setClientSecret={setClientSecret}
              />
            )}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
              }}
            >
              {activeComponent === "payment_method" &&
                stripePromise &&
                clientSecret && (
                  <PaymentMethod
                    setActiveComponent={setActiveComponent}
                    activeComponent={activeComponent}
                    clientSecret={clientSecret}
                  />
                )}
            </Elements>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
