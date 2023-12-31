import React from "react";
import { useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Download = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { downloads, loading } = useSelector((state) => state.root.cart);

  const { t } = useTranslation();

  // pagination logic
  const downloadsPerPage = 8;
  const pageVisited = pageNumber * downloadsPerPage;
  let displayDownloads = downloads.slice(
    pageVisited,
    downloadsPerPage + pageVisited
  );
  const pageCount = Math.ceil(downloads.length / downloadsPerPage);
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
          {downloads !== undefined && downloads.length > 0 ? (
            <div className="border border-gray-300 w-full overflow-x-scroll scrollbar ">
              <table className="w-full overflow-x-scroll">
                <thead className="w-full border-b border-gray-300">
                  <th className="md:p-4 p-2 text-left">{t("Product")}</th>
                  <th className="md:p-4 p-2 text-left">{t("Purchase Date")}</th>
                  <th className="md:p-4 p-2 text-center">{t("Action")}</th>
                </thead>
                <tbody>
                  {displayDownloads.map((magazine) => (
                    <tr key={magazine?._id}>
                      <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap flex md:flex-row flex-col items-center justify-start gap-3">
                        <img
                          src={BaseUrl.concat(magazine?.image)}
                          alt={magazine?.title}
                          className="w-40 md:h-48 h-32 object-contain object-center"
                        />
                        <p>
                          <b>{magazine?.title}</b>
                        </p>
                      </td>
                      <td className="md:p-4 p-3 font-medium text-left whitespace-nowrap">
                        {moment(magazine?.purchaseDate).format("lll")}
                      </td>

                      <td className="md:p-4 p-3 font-medium text-center">
                        <a
                          href={BaseUrl.concat(magazine?.pdf)}
                          target="_blank"
                          download
                        >
                          <button className="uppercase gray_button">
                            {t("download")}
                          </button>
                        </a>
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
            <div className="w-full loading">{t("No Downloads here.")}</div>
          )}
        </>
      )}
    </>
  );
};

export default Download;
