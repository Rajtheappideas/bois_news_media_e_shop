import React, { useState } from "react";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";

const Address = () => {
  const [activeAddress, setActiveAddress] = useState("");

  return (
    <>
      {activeAddress === "billing" && (
        <BillingAddress setActiveAddress={setActiveAddress} />
      )}
      {activeAddress === "delivery" && (
        <DeliveryAddress setActiveAddress={setActiveAddress} />
      )}
      {activeAddress === "" && (
        <div className="w-full grid md:grid-cols-2 place-items-start items-start gap-4">
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
          <div className="w-full space-y-3">
            <p className="heading">Delivery Address</p>
            <div className="flex gap-3 w-full md:h-60 h-40 items-center justify-center flex-col border border-gray-300">
              <button
                className="w-1/2 uppercase gray_button"
                onClick={() => setActiveAddress("delivery")}
              >
                add
              </button>
              <p>You have not yet defined this type of address.</p>
            </div>
          </div>
          {/* <div className="space-y-2 w-full">
            <p className="heading">Billing address</p>
            <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
              <p>
                <b>John Adam</b>
              </p>
              <p>
                4127 State Street, Michigan, Southfield 48075 <br /> United
                States <br /> +01 123456475 <br /> johnadma@mail.com
              </p>
              <button className="capitalize gray_button md:w-48 w-full">modify</button>

            </div>
          </div> */}
          {/* <div className="space-y-2 w-full">
            <p className="heading">Delivery address</p>
            <div className="w-full md:p-4 p-2 border border-gray-300 space-y-2">
              <p>
                <b>John Adam</b>
              </p>
              <p>
                4127 State Street, Michigan, Southfield 48075 <br /> United
                States <br /> +01 123456475 <br /> johnadma@mail.com
              </p>
              <button className="capitalize gray_button md:w-48 w-full">
                modify
              </button>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Address;
