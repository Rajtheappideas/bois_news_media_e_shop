import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = ({ setActiveComponent, activeComponent }) => {
  const { cart, total } = useSelector((state) => state.root.cart);

  const handleComponent = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activeComponent === "checkout_form") {
      setActiveComponent("payment_method");
    } else if (activeComponent === "payment_method") {
      setActiveComponent("success");
    }
  };

  return (
    <div className="border border-gray-300 md:space-y-3 space-y-2 xl:sticky top-36 z-0 xl:w-3/12 md:w-1/2 w-full ml-auto">
      {/* title */}
      <p className="md:text-xl p-2">
        <b>My order</b>
      </p>
      <hr />
      {/* order details */}
      <div className="p-2 md:space-y-5 space-y-3">
        {cart !== undefined &&
          cart?.length > 0 &&
          cart.map((product) => (
            <div
              key={product?._id}
              className="flex items-start justify-between md:text-base text-sm"
            >
              <div>
                <p>
                  <b>{product?.title}</b>
                </p>
                <p className="md:text-base text-sm">
                  Quantity : {product?.quantity}
                </p>
              </div>
              <p className="font-medium w-fit whitespace-nowrap">
                €{" "}
                {Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                }).format(
                  parseFloat(product?.price) * parseFloat(product?.quantity)
                )}
              </p>
            </div>
          ))}
      </div>
      <hr />
      {/* total */}
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between">
          <p>
            <b>Total</b>
          </p>
          <p>
            <b>
              {" "}
              € &nbsp;
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
              }).format(parseFloat(total))}
            </b>
          </p>
        </div>
        <button
          onClick={() => {
            handleComponent();
          }}
          className="capitalize w-full gray_button md:h-12 font-semibold"
        >
          {activeComponent === "checkout_form" ? "continue" : "confirm order"}
        </button>
        {activeComponent === "payment_method" && (
          <button
            onClick={() => setActiveComponent("checkout_form")}
            className="capitalize w-full black_button md:h-12 font-semibold"
          >
            back
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
