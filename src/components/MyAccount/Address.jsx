import React, { useState } from "react";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import { useSelector } from "react-redux";
import EditShippingAddress from "./EditShippingAddress";
import EditBillingAddress from "./EditBillingAddress";
import { useTranslation } from "react-i18next";

const Address = () => {
  const [activeAddress, setActiveAddress] = useState("");
  const [activeEditAddress, setActiveEditAddress] = useState("");

  const { t } = useTranslation();

  const { addresses, loading } = useSelector((s) => s.root.auth);

  return (
    <>
      {loading ? (
        <div className="loading">{t("Loading").concat("...")}</div>
      ) : (
        <>
          {activeAddress === "billing" && (
            <BillingAddress setActiveAddress={setActiveAddress} />
          )}
          {activeEditAddress === "billing" && (
            <EditBillingAddress setActiveEditAddress={setActiveEditAddress} />
          )}
          {activeAddress === "shipping" && (
            <ShippingAddress setActiveAddress={setActiveAddress} />
          )}
          {activeEditAddress === "shipping" && (
            <EditShippingAddress setActiveEditAddress={setActiveEditAddress} />
          )}

          {activeAddress === "" && activeEditAddress === "" && (
            <div className="w-full grid md:grid-cols-2 place-items-start items-start gap-4">
              {addresses !== null &&
              !Object.values(addresses?.billingAddress).length > 0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">{t("Billing address")}</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      {addresses?.billingAddress?.zipCode}, <br />
                      {addresses?.billingAddress?.address1}, <br />
                      {addresses?.billingAddress?.city}, <br />
                      {addresses?.billingAddress?.province}, <br />
                      {addresses?.billingAddress?.country}, <br />
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("billing")}
                      className="capitalize gray_button md:w-48 w-full"
                    >
                      {t("modify")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <p className="heading">{t("Billing address")}</p>
                  <div className="flex gap-3 md:h-60 h-40 w-full items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase gray_button"
                      onClick={() => setActiveAddress("billing")}
                    >
                      {t("add")}
                    </button>

                    <p>{t("You have not yet defined this type of address")}.</p>
                  </div>
                </div>
              )}
              {addresses !== null &&
              !Object.values(addresses?.shippingAddress).length > 0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">{t("Shipping address")}</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      {addresses?.shippingAddress?.zipCode}, <br />
                      {addresses?.shippingAddress?.address1}, <br />
                      {addresses?.shippingAddress?.city}, <br />
                      {addresses?.shippingAddress?.province}, <br />
                      {addresses?.shippingAddress?.country}, <br />
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("shipping")}
                      className="capitalize gray_button md:w-48 w-full"
                    >
                      {t("modify")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <p className="heading">{t("Shipping address")}</p>
                  <div className="flex gap-3 w-full md:h-60 h-40 items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase gray_button"
                      onClick={() => setActiveAddress("shipping")}
                    >
                      {t("add")}
                    </button>

                    <p>{t("You have not yet defined this type of address")}.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Address;
