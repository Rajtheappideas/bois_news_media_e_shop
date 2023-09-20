import React, { useState } from "react";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import { useSelector } from "react-redux";
import EditShippingAddress from "./EditShippingAddress";
import EditBillingAddress from "./EditBillingAddress";

const Address = () => {
  const [activeAddress, setActiveAddress] = useState("");
  const [activeEditAddress, setActiveEditAddress] = useState("");

  const { user, loading } = useSelector((s) => s.root.auth);

  return (
    <>
      {loading ? (
        <div className="loading">Loading....</div>
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
              {Object.values(user?.billingAddress).length > 0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">Billing address</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      <b className="capitalize">
                        {user?.fname} {user?.lname}
                      </b>
                    </p>
                    <p>
                      {user?.billingAddress?.zipCode} &nbsp;
                      {user?.billingAddress?.address1}&nbsp;
                      {user?.billingAddress?.city}&nbsp;
                      {user?.billingAddress?.province}
                      <br /> {user?.billingAddress?.country} <br />{" "}
                      {user?.phone}
                      <br />
                      {user?.email}
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("billing")}
                      className="capitalize gray_button md:w-48 w-full"
                    >
                      modify
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <p className="heading">Billing Address</p>
                  <div className="flex gap-3 md:h-60 h-40 w-full items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase gray_button"
                      onClick={() => setActiveAddress("billing")}
                    >
                      add
                    </button>

                    <p>You have not yet defined this type of address.</p>
                  </div>
                </div>
              )}
              {Object.values(user?.shippingAddress).length > 0 ? (
                <div className="space-y-2 w-full">
                  <p className="heading">Delivery address</p>
                  <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
                    <p>
                      <b className="capitalize">
                        {user?.fname} {user?.lname}
                      </b>
                    </p>
                    <p>
                      {user?.shippingAddress?.zipCode} &nbsp;
                      {user?.shippingAddress?.address1}&nbsp;
                      {user?.shippingAddress?.city}&nbsp;
                      {user?.shippingAddress?.province}
                      <br /> {user?.shippingAddress?.country} <br />{" "}
                      {user?.phone}
                      <br />
                      {user?.email}
                    </p>
                    <button
                      onClick={() => setActiveEditAddress("shipping")}
                      className="capitalize gray_button md:w-48 w-full"
                    >
                      modify
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <p className="heading">Shipping Address</p>
                  <div className="flex gap-3 w-full md:h-60 h-40 items-center justify-center flex-col border border-gray-300">
                    <button
                      className="w-1/2 uppercase gray_button"
                      onClick={() => setActiveAddress("shipping")}
                    >
                      add
                    </button>

                    <p>You have not yet defined this type of address.</p>
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
