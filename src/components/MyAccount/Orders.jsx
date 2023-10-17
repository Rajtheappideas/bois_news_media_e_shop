import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { handleFindSingleOrder } from "../../redux/CartSlice";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const Orders = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { orders, loading } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // pagination logic
  const ordersPerPage = 8;
  const pageVisited = pageNumber * ordersPerPage;
  let displayOrders = orders.slice(pageVisited, ordersPerPage + pageVisited);
  const pageCount = Math.ceil(orders.length / ordersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <>
              {orders !== undefined && orders.length > 0 ? (
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
                      {displayOrders.map((order) => (
                        <tr key={order?._id}>
                          <td className="md:p-4 p-3 font-medium text-center whitespace-nowrap">
                            {order?.orderId}
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
                      ))}
                    </tbody>
                  </table>
                  <hr />
                  {/* pagination */}
                  <div className="flex xl:flex-row flex-col items-center w-full gap-3">
                    <div className="w-full bg-white p-3 flex md:flex-row flex-col gap-3 items-center justify-between">
                      <ReactPaginate
                        onPageChange={changePage}
                        previousLabel={
                          <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                            <BsChevronLeft className="h-5 w-5 rounded-md text-black" />
                          </p>
                        }
                        nextLabel={
                          <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                            <BsChevronRight className="h-5 w-5 rounded-md text-black" />
                          </p>
                        }
                        pageClassName="bg-gray-200 text-black px-2 py-2 rounded-md text-center"
                        pageLinkClassName="p-2"
                        breakLabel="..."
                        breakClassName=""
                        breakLinkClassName=""
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        containerClassName=""
                        activeClassName="active"
                        className="flex items-center md:gap-3 gap-2 flex-wrap"
                        forcePage={pageNumber}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full loading">{t("No Orders here.")}</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
