import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleFindSingleOrder } from "../../redux/CartSlice";
import moment from "moment";

const OrderDetails = ({ setShowOrderDetails }) => {
  const { singleOrder } = useSelector((s) => s.root.cart);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <div className="md:space-y-3 space-y-2">
      <div className="md:space-y-3 space-y-2 w-full border border-gray-300 md:text-lg text-sm">
        {/* heading */}
        <p className="heading text-lg md:text-left text-center flex items-center justify-between md:p-4 p-2">
          <span>{t("Order Details")}</span>
          <AiOutlineClose
            onClick={() => {
              dispatch(handleFindSingleOrder(null));
              setShowOrderDetails(false);
            }}
            role="button"
            className="mr-2 md:h-8 md:w-8 h-6 w-6 bg-darkBlue rounded-full text-white p-1"
          />{" "}
        </p>
        {/* order no, status, date */}
        <div className="w-full flex items-center md:justify-around flex-wrap gap-3 md:px-0 px-3">
          <div>
            {t("Order No")} : <b>{singleOrder?.orderId}</b>
          </div>
          <div>
            {t("Order Date")} : <b>{moment(singleOrder?.date).format("lll")}</b>
          </div>
          <div>
            {t("Order Status")} : <b>{singleOrder?.status}</b>
          </div>
        </div>
        <hr />
        {/* heading */}
        <div className="md:p-4 p-2 font-semibold flex justify-between items-center">
          <p>{t("Product")}</p>
          <p>{t("Total")}</p>
        </div>
        <hr />
        {/* products */}
        {singleOrder?.items?.map((item) => (
          <div
            key={item?._id}
            className="flex items-center border-b-2 justify-between md:p-4 p-2 md:text-base text-sm"
          >
            <div className="space-y-2">
              <p>
                <b>{item?.title}</b>
              </p>
              <p>
                {t("Type of support")} : {item?.support}
              </p>
              {/* <p>{t("Shipping area")} : Metropolitan France</p> */}
            </div>
            <div className="text-right md:text-base text-sm">
              {" "}
              €&nbsp;
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(parseFloat(item?.quantity) * parseFloat(item?.price))}
            </div>
          </div>
        ))}
        {/* sub total */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>{t("Sub Total")}</p>
          <p>
            €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(singleOrder?.subtotal))}
          </p>
        </div>
        <hr />
        {/* shipping */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>{t("Shipping")}</p>
          <p>
            {" "}
            €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(singleOrder?.shipping))}
          </p>
        </div>
        <hr />
        {/* tax */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>{t("Tax")}</p>
          <p>
            €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(singleOrder?.tax))}
          </p>
        </div>
        <hr />
        {/* discount */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>{t("Discount")}</p>
          <p>
            €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(singleOrder?.discount))}
          </p>
        </div>
        <hr />
        {/* payment method */}
        <div className="md:p-4 p-2 font-medium flex justify-between items-center">
          <p>{t("Payment method")}</p>
          <p>Card</p>
        </div>
        <hr />
        {/* total */}
        <div className="md:p-4 p-2 font-semibold flex justify-between items-center">
          <p>{t("Total")}</p>
          <p>
            {" "}
            €&nbsp;
            {Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(parseFloat(singleOrder?.total))}
          </p>
        </div>
      </div>
      {/* address */}
      <div className="w-full grid md:grid-cols-2 place-items-start items-start md:gap-4 gap-5">
        <div className="space-y-2 w-full">
          <p className="heading">{t("Billing address")}</p>
          <div className="w-full md:p-4 p-2  border border-gray-300 space-y-2">
            <p>
              <b>
                {singleOrder?.billingAddress?.fname}{" "}
                {singleOrder?.billingAddress?.lname}
              </b>
            </p>
            <p>
              {singleOrder?.billingAddress?.zipCode} <br />
              {singleOrder?.billingAddress?.address1}, <br />
              {singleOrder?.billingAddress?.city}, <br />
              {singleOrder?.billingAddress?.province}
              <br /> {singleOrder?.billingAddress?.country} <br />{" "}
              {singleOrder?.phone}
              <br /> {singleOrder?.email}
            </p>
          </div>
        </div>
        <div className="space-y-2 w-full">
          <p className="heading">{t("Delivery address")}</p>
          <div className="w-full md:p-4 p-2 border border-gray-300 space-y-2">
            <p>
              <b>
                {singleOrder?.shippingAddress?.fname}{" "}
                {singleOrder?.shippingAddress?.lname}
              </b>
            </p>
            <p>
              {singleOrder?.shippingAddress?.zipCode} <br />
              {singleOrder?.shippingAddress?.address1}, <br />
              {singleOrder?.shippingAddress?.city}, <br />
              {singleOrder?.shippingAddress?.province}
              <br /> {singleOrder?.shippingAddress?.country} <br />{" "}
              {singleOrder?.phone}
              <br /> {singleOrder?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
