import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const OrderDetails = ({ setShowOrderDetails }) => {
  return (
    <div className="md:space-y-3 space-y-2">
      <div className="md:space-y-3 space-y-2 w-full border border-gray-300 md:text-lg text-sm">
        {/* heading */}
        <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
          <span>Order Details</span>
          <AiOutlineClose
            onClick={() => setShowOrderDetails(false)}
            role="button"
            className="mr-2 md:h-8 md:w-8 h-6 w-6 bg-darkBlue rounded-full text-white p-1"
          />{" "}
        </p>
        {/* order no, status, date */}
        <div className="w-full flex items-center md:justify-around flex-wrap gap-3 md:px-0 px-3">
          <div>
            Order No : <b>#4536</b>
          </div>
          <div>
            Order Date : <b>August 23, 2023</b>
          </div>
          <div>
            Order Status : <b>Hold</b>
          </div>
        </div>
        <hr />
        {/* heading */}
        <div className="md:p-4 p-2 font-semibold flex justify-between items-center">
          <p>Product</p>
          <p>Total</p>
        </div>
        <hr />
        {/* products */}
        <div className="flex items-center justify-between md:p-4 p-2 md:text-base text-sm">
          <div className="space-y-2">
            <p>
              <b>BOISmag subscription</b>
            </p>
            <p>Type of support : Digital (PDF)</p>
            <p>Shipping area : Metropolitan France</p>
          </div>
          <div className="text-right md:text-base text-sm">€ 115.00</div>
        </div>
        <hr />
        {/* products */}
        <div className="flex items-center justify-between md:p-4 p-2">
          <div className="space-y-2">
            <p>
              <b>BOISmag subscription</b>
            </p>
            <p>Type of support : Digital (PDF)</p>
            <p>Shipping area : Metropolitan France</p>
          </div>
          <div>€ 115.00</div>
        </div>
        <hr />
        {/* sub total */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>Sub Total</p>
          <p>€ 135.00</p>
        </div>
        <hr />
        {/* shipping */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <hr />
        {/* payment method */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>Payment method</p>
          <p>Bank transfer</p>
        </div>
        <hr />
        {/* total */}
        <div className="md:p-4 p-2 font-semibold flex justify-between items-center">
          <p>Total</p>
          <p>€ 135.00</p>
        </div>
      </div>
      {/* address */}
      <div className="w-full grid md:grid-cols-2 place-items-start items-start md:gap-4 gap-5">
        <div className="space-y-2 w-full">
          <p className="heading">Billing address</p>
          <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
            <p>
              <b>John Adam</b>
            </p>
            <p>
              4127 State Street, Michigan, Southfield 48075 <br /> United States{" "}
              <br /> +01 123456475 <br /> johnadma@mail.com
            </p>
          </div>
        </div>
        <div className="space-y-2 w-full">
          <p className="heading">Delivery address</p>
          <div className="w-full md:p-4 p-2 border border-gray-300 space-y-2">
            <p>
              <b>John Adam</b>
            </p>
            <p>
              4127 State Street, Michigan, Southfield 48075 <br /> United States{" "}
              <br /> +01 123456475 <br /> johnadma@mail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
