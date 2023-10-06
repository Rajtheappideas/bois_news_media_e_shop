import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { handleFindSingleOrder } from "../../redux/CartSlice";

const Orders = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const { orders, loading } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        <div className="loading">{t("Loading").concat("...")}</div>
      ) : (
        <>
          {showOrderDetails ? (
            <OrderDetails
              setShowOrderDetails={setShowOrderDetails}
              showOrderDetails={showOrderDetails}
            />
          ) : (
            <div className="border border-gray-300 w-full overflow-x-scroll scrollbar ">
              <table className="w-full overflow-x-scroll">
                <thead className="w-full border-b border-gray-300">
                  <th className="md:p-4 p-2 text-center">{t("Order")}</th>
                  <th className="md:p-4 p-2 text-center">{t("Date")}</th>
                  <th className="md:p-4 p-2 text-center">{t("Status")}</th>
                  <th className="md:p-4 p-2 text-center">{t("Total")}</th>
                  <th className="md:p-4 p-2 text-center">{t("Action")}</th>
                </thead>
                <tbody>
                  {orders !== undefined && orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order?._id}>
                        <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                          #{order?.orderId}
                        </td>
                        <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                          {moment(order?.date).format("lll")}
                        </td>
                        <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                          {order?.status}
                        </td>
                        <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                          €&nbsp;
                          {Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(order?.total)}{" "}
                          for {order?.items?.length} items
                        </td>
                        <td className="md:p-4 p-3 font-medium text-center">
                          <button
                            className="uppercase gray_button"
                            onClick={() => {
                              dispatch(handleFindSingleOrder(order?._id));
                              setShowOrderDetails(true);
                            }}
                          >
                            {t("view")}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>{t("No Orders here.")}</tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
