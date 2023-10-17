import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const OrderSummary = ({
  setActiveComponent,
  activeComponent,
  onSubmit,
  errors,
  handleCreateOrder,
  loading,
}) => {
  const {
    cart,
    total,
    tax,
    shipping,
    discount,
    checkoutLoading,
    promoCodeDiscount,
    isPromoCodeApplied,
    subTotal,
  } = useSelector((state) => state.root.cart);

  const { t } = useTranslation();

  const handleSubmit = () => {
    if (activeComponent === "checkout_form") {
      if (Object.values(errors).length > 0) {
        return toast.error("Fill all required fields.");
      }
      return onSubmit();
    } else {
      handleCreateOrder();
    }
  };

  return (
    <div className="border border-gray-300 md:space-y-3 space-y-2 xl:sticky top-36 z-0 xl:w-3/12 md:w-1/2 w-full ml-auto">
      {/* title */}
      <p className="md:text-xl p-2">
        <b>{t("My order")}</b>
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
              <div className="w-2/3">
                <p>
                  <b>{product?.itemId?.title}</b>
                </p>
                <p className="md:text-base text-sm break-words">
                  {t("Quantity")} : {product?.quantity}
                </p>
              </div>
              <p className="font-medium w-1/3 text-right break-words">
                €{" "}
                {Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                }).format(
                  parseFloat(product?.itemId?.price) *
                    parseFloat(product?.quantity)
                )}
              </p>
            </div>
          ))}
      </div>
      <hr />
      {/* total + tax+ shipping */}
      <div className="p-2 space-y-2">
        {/* sub total */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Sub Total")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
            € &nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(parseFloat(subTotal))}
          </p>
        </div>
        {/* tax */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Tax")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
            € &nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(parseFloat(tax))}
          </p>
        </div>
        {/* shipping */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Shipping")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
            € &nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
            }).format(parseFloat(shipping))}
          </p>
        </div>
        {/* discount */}
        {discount !== 0 && (
          <div className="flex items-center justify-between">
            <p className="w-1/2">
              <b>{t("Discount")}</b>
            </p>
            <p className="break-words w-1/2 text-right">
              € &nbsp;-&nbsp;
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
              }).format(parseFloat(discount))}
            </p>
          </div>
        )}
        {/* promo code */}
        {isPromoCodeApplied && (
          <div className="flex items-center justify-between">
            <p className="w-1/2">
              <b>{t("PromoCode")}</b>
            </p>
            <p className="break-words w-1/2 text-right">
              € &nbsp;-
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
              }).format(promoCodeDiscount)}
            </p>
          </div>
        )}

        <hr />
        {/* total */}
        <div className="flex items-center justify-between">
          <p className="w-1/2">
            <b>{t("Total")}</b>
          </p>
          <p className="break-words w-1/2 text-right">
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
            handleSubmit();
          }}
          disabled={checkoutLoading || loading}
          className="capitalize w-full gray_button md:h-12 font-semibold"
          type="button"
        >
          {activeComponent === "checkout_form"
            ? checkoutLoading
              ? "Submitting Details..."
              : "continue"
            : checkoutLoading || loading
            ? "Processing..."
            : "Checkout"}
          {/* {checkoutLoading ? t("Placing order...") : t("Confirm Order")} */}
        </button>
        {activeComponent === "payment_method" && (
          <button
            onClick={() => setActiveComponent("checkout_form")}
            className="capitalize w-full black_button md:h-12 font-semibold"
          >
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
