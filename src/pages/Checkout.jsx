import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import HeadNavigationLink from "../components/HeadNavigationLink";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import Success from "../components/Success";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChangeShowSignin } from "../redux/globalStates";
import toast from "react-hot-toast";

const Checkout = () => {
  const [activeComponent, setActiveComponent] = useState("checkout_form");

  const { user } = useSelector((state) => state.root.auth);
  const { cart } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
    if (cart && cart?.length === 0) {
      navigate("/shop");
    }
  }, []);

  return (
    <>
      {activeComponent === "success" && (
        <Success
          title="Thank you !"
          description="Your order has been received."
          btnText="continue shopping"
          link="/shop"
        />
      )}
      <div className="Container lg:py-10 py-5 md:space-y-5 space-y-3">
        {/* {activeComponent !== "success" && <HeadNavigationLink />} */}
        {activeComponent !== "success" && (
          <div className="w-full flex xl:flex-row flex-col items-start lg:gap-6 gap-3">
            <div className="xl:w-9/12 w-full">
              {activeComponent === "checkout_form" && <CheckoutForm />}
              {activeComponent === "payment_method" && <PaymentMethod />}
            </div>
            <OrderSummary
              setActiveComponent={setActiveComponent}
              activeComponent={activeComponent}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
