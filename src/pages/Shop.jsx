import React, { useEffect, useState } from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import Categories from "../components/Categories";
import { BsChevronLeft, BsChevronRight, BsFillGridFill } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import MagazineCard from "../components/MagazineCard";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeGridView } from "../redux/ShopSlice";
import MagazineOrSubscriptionDetails from "../components/MagazineOrSubscriptionDetails";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Shop = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [activeFilter, setActiveFilter] = useState("");
  const [showMagazines, setShowMagazines] = useState([]);

  const {
    selectedView,
    activeCategory,
    showMagazineOrSubscriptionDetails,
    magazines,
    subscriptions,
    magazineLoading,
    subscriptionLoading,
    allMagazinesAndSubscriptions,
  } = useSelector((state) => state.root.shop);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // pagination logic
  const magazinesPerPage = 12;
  const pageVisited = pageNumber * magazinesPerPage;
  let displayMagazines = showMagazines.slice(
    pageVisited,
    magazinesPerPage + pageVisited
  );
  const pageCount = Math.ceil(showMagazines.length / magazinesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function paginationResult() {
    return `${
      showMagazines?.length > 0
        ? pageNumber * magazinesPerPage === 0
          ? 1
          : pageNumber * magazinesPerPage + 1
        : 0
    } - ${
      !showMagazines
        ? 0
        : showMagazines?.length < magazinesPerPage
        ? showMagazines?.length
        : magazinesPerPage * (pageNumber + 1) > showMagazines?.length
        ? showMagazines?.length
        : magazinesPerPage * (pageNumber + 1)
    } of ${showMagazines?.length ?? 0} results`;
  }

  function handleChangeMagazinesAccordingToCategory() {
    if (magazineLoading || subscriptionLoading) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (activeCategory === "view_all") {
      setShowMagazines(allMagazinesAndSubscriptions);
      handleFilter(allMagazinesAndSubscriptions);
      return;
    } else if (activeCategory === "subscriptions") {
      setShowMagazines(subscriptions);
      handleFilter(subscriptions);
      return;
    } else if (activeCategory === "magazines") {
      setShowMagazines(magazines);
      handleFilter(magazines);
      return;
    } else if (activeCategory === "boismag") {
      if (magazines.length > 0) {
        const updatedMagazines = magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("boismag")
        );
        setShowMagazines(updatedMagazines);
        handleFilter(updatedMagazines);
        return;
      }
      return setShowMagazines([]);
    } else if (activeCategory === "agenceur") {
      if (magazines.length > 0) {
        const updatedMagazines = magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("agenceur")
        );
        setShowMagazines(updatedMagazines);
        handleFilter(updatedMagazines);
        return;
      }
      return setShowMagazines([]);
    } else if (activeCategory === "artisans_and_bois") {
      if (magazines.length > 0) {
        const updatedMagazines = magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("artisans_and_bois")
        );
        setShowMagazines(updatedMagazines);
        handleFilter(updatedMagazines);
        return;
      }
      return setShowMagazines([]);
    } else if (activeCategory === "toiture") {
      if (magazines.length > 0) {
        const updatedMagazines = magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("toiture")
        );
        setShowMagazines(updatedMagazines);
        handleFilter(updatedMagazines);
        return;
      }
      return setShowMagazines([]);
    }
  }

  function handleFilter(items) {
    if (activeFilter === "new_to_old") {
      return setShowMagazines(items);
    } else if (activeFilter === "old_to_new") {
      return setShowMagazines(items?.slice()?.reverse());
    } else if (activeFilter === "high_to_low") {
      const highToLow = items?.slice().sort((a, b) => {
        return b.pricePaper - a.pricePaper;
      });
      return setShowMagazines(highToLow);
    } else if (activeFilter === "low_to_high") {
      const lowToHigh = items?.slice().sort((a, b) => {
        return a.pricePaper - b.pricePaper;
      });
      return setShowMagazines(lowToHigh);
    }
  }

  useEffect(() => {
    handleChangeMagazinesAccordingToCategory();
    setPageNumber(0);
  }, [activeCategory, activeFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title> {"Shop"} | E-shop </title>
      </Helmet>
      <div className="Container space-y-5 lg:py-10 py-5">
        {/* magazine or subscription Detais */}
        {showMagazineOrSubscriptionDetails && <MagazineOrSubscriptionDetails />}
        {!showMagazineOrSubscriptionDetails && (
          <div className="w-full flex lg:flex-row flex-col items-start gap-3">
            <div className="lg:w-3/12 w-full lg:sticky top-36 bg-white">
              <Categories />
            </div>
            {magazineLoading || subscriptionLoading ? (
              <div className="loading">{t("Loading").concat("...")}</div>
            ) : (
              <div className="lg:w-9/12 w-full space-y-3">
                {/* filter */}
                <div className="w-full flex md:flex-row flex-col gap-2 justify-between items-center p-2 border text-black font-medium">
                  {/* btns  */}
                  <div className="flex items-center flex-wrap gap-2">
                    <BsFillGridFill
                      className={`text-2xl cursor-pointer ${
                        selectedView === "grid"
                          ? "text-darkBlue"
                          : "text-gray-300"
                      }`}
                      onClick={() => dispatch(handleChangeGridView("grid"))}
                    />
                    <IoListOutline
                      className={`text-3xl cursor-pointer ${
                        selectedView === "single"
                          ? "text-darkBlue"
                          : "text-gray-300"
                      }`}
                      onClick={() => dispatch(handleChangeGridView("single"))}
                    />
                    <span className="font-semibold md:text-base text-sm">
                      {t("Showing")} {paginationResult()}
                    </span>
                  </div>
                  {/* filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold ">{t("Sort by")}:</span>
                    <select
                      name="sort"
                      className="bg-gray-100 p-2 border outline-none font-medium"
                      onChange={(e) => {
                        setActiveFilter(e.target.value);
                      }}
                    >
                      <option value="new_to_old">
                        {t("Newest to Oldest")}
                      </option>
                      <option value="old_to_new">
                        {t("Oldest to Newest")}
                      </option>
                      <option value="high_to_low">{t("High to Low")}</option>
                      <option value="low_to_high">{t("Low to High")}</option>
                    </select>
                  </div>
                </div>
                {/* products */}
                <div
                  className={`w-full py-4 ${
                    selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
                  } grid  place-items-start items-start md:gap-5 gap-3`}
                >
                  {magazineLoading || subscriptionLoading ? (
                    <div className="loading col-span-full">
                      {t("Loading").concat("...")}
                    </div>
                  ) : showMagazines.length > 0 &&
                    magazines.length > 0 &&
                    subscriptions.length > 0 ? (
                    displayMagazines?.map((magazine, i) => (
                      <MagazineCard key={i} data={magazine} />
                    ))
                  ) : (
                    <div className="loading col-span-full">
                      {t("No Subscriptions or Magazines here")}.
                    </div>
                  )}
                </div>

                {/* pagination */}
                <div className="flex xl:flex-row flex-col items-center w-full gap-3 ">
                  <div className="w-full border border-BORDERGRAY bg-white p-3 flex md:flex-row flex-col gap-3 items-center justify-between">
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
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
