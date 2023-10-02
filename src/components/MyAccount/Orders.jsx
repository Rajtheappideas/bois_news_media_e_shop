import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const { t } = useTranslation();

  return (
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
              <tr>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  #4536
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  August 23, 2023
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  On hold
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  € 135.00 for 2 items
                </td>
                <td className="md:p-4 p-3 font-medium text-center">
                  <button
                    className="uppercase gray_button"
                    onClick={() => setShowOrderDetails(true)}
                  >
                    {t("view")}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  #4536
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  August 23, 2023
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  On hold
                </td>
                <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                  € 135.00 for 2 items
                </td>
                <td className="md:p-4 p-3 font-medium text-center">
                  <button
                    className="uppercase gray_button"
                    onClick={() => setShowOrderDetails(true)}
                  >
                    {t("view")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
