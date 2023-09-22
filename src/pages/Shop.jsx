import React, { useState } from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import Categories from "../components/Categories";
import { BsChevronLeft, BsChevronRight, BsFillGridFill } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import MagazineCard from "../components/MagazineCard";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeGridView } from "../redux/ShopSlice";
import SubscriptionDetails from "../components/SubscriptionDetails";
import MagazineDetails from "../components/MagazineDetails";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

const Shop = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [allMagazinesAndSubscriptions, setAllMagazinesAndSubscriptions] =
    useState([]);

  const {
    selectedView,
    activeCategory,
    showSubscriptionDetails,
    showMagazineDetails,
    magazines,
    subscriptions,
    magazineLoading,
    subscriptionLoading,
  } = useSelector((state) => state.root.shop);

  const dispatch = useDispatch();

  // pagination logic

  const magazinesPerPage = 12;
  const pageVisited = pageNumber * magazinesPerPage;
  const displayMagazines = magazines?.slice(
    pageVisited,
    magazinesPerPage + pageVisited
  );
  const pageCount = Math.ceil(magazines?.length / magazinesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (
      !magazineLoading &&
      !subscriptionLoading &&
      magazines?.length > 0 &&
      subscriptions?.length > 0
    ) {
      setAllMagazinesAndSubscriptions([...subscriptions, ...magazines]);
    }
  }, [magazineLoading, subscriptionLoading, magazines, subscriptions]);

  function paginationResult() {
    if (activeCategory === "view_all") {
      return `${
        allMagazinesAndSubscriptions?.length > 0
          ? pageNumber * magazinesPerPage === 0
            ? 1
            : pageNumber * magazinesPerPage + 1
          : 0
      } - ${
        !allMagazinesAndSubscriptions
          ? 0
          : allMagazinesAndSubscriptions?.length < magazinesPerPage
          ? allMagazinesAndSubscriptions?.length
          : magazinesPerPage * (pageNumber + 1) >
            allMagazinesAndSubscriptions?.length
          ? allMagazinesAndSubscriptions?.length
          : magazinesPerPage * (pageNumber + 1)
      } of ${allMagazinesAndSubscriptions?.length ?? 0} results`;
    } else if (activeCategory === "subscriptions") {
      return `${
        subscriptions?.length > 0
          ? pageNumber * magazinesPerPage === 0
            ? 1
            : pageNumber * magazinesPerPage + 1
          : 0
      } - ${
        !subscriptions
          ? 0
          : subscriptions?.length < magazinesPerPage
          ? subscriptions?.length
          : magazinesPerPage * (pageNumber + 1) > subscriptions?.length
          ? subscriptions?.length
          : magazinesPerPage * (pageNumber + 1)
      } of ${subscriptions?.length ?? 0} results`;
    } else if (activeCategory === "magazines") {
      return `${
        magazines?.length > 0
          ? pageNumber * magazinesPerPage === 0
            ? 1
            : pageNumber * magazinesPerPage + 1
          : 0
      } - ${
        !magazines
          ? 0
          : magazines?.length < magazinesPerPage
          ? magazines?.length
          : magazinesPerPage * (pageNumber + 1) > magazines?.length
          ? magazines?.length
          : magazinesPerPage * (pageNumber + 1)
      } of ${magazines?.length ?? 0} results`;
    } else {
      return `${
        magazines?.length > 0
          ? pageNumber * magazinesPerPage === 0
            ? 1
            : pageNumber * magazinesPerPage + 1
          : 0
      } - ${
        !magazines
          ? 0
          : magazines?.length < magazinesPerPage
          ? magazines?.length
          : magazinesPerPage * (pageNumber + 1) > magazines?.length
          ? magazines?.length
          : magazinesPerPage * (pageNumber + 1)
      } of ${magazines?.length ?? 0} results`;
    }
  }

  return (
    <div className="Container space-y-5 lg:py-10 py-5">
      {/* <HeadNavigationLink /> */}
      {/* subscription Detais */}
      {showSubscriptionDetails && <SubscriptionDetails />}

      {/* magazine Detais */}
      {showMagazineDetails && <MagazineDetails />}
      {!showMagazineDetails && !showSubscriptionDetails && (
        <div className="w-full flex lg:flex-row flex-col items-start gap-3">
          <div className="lg:w-3/12 w-full">
            <Categories />
          </div>
          <div className="lg:w-9/12 w-full space-y-3">
            {/* for magazines only */}
            {/* {(activeCategory === "woodmag" ||
              activeCategory === "the_magazine_designer" ||
              activeCategory === "roofing_magazine" ||
              activeCategory === "craftsmen_&_wood") && (
              <div className="md:space-y-3 space-y-1">
                <p className="md:text-2xl text-lg font-semibold">
                  The magazine designer
                </p>
                <p className="md:text-base text-sm font-medium text-black leading-relaxed tracking-wide">
                  Review for professionals covering the latest news on interior
                  designer products and solutions, decoration, materials, light,
                  furnishings, floor coverings, walls and ceilings...
                  Readership: Interior designers, fitters, fitter carpenters ,
                  decorators, designers, kitchen designers, decorative hardware…
                </p>
              </div>
            )} */}
            {/* filter */}
            <div className="w-full flex md:flex-row flex-col gap-2 justify-between items-center p-2 border text-black font-medium">
              {/* btns  */}
              <div className="flex items-center flex-wrap gap-2">
                <BsFillGridFill
                  className={`text-2xl cursor-pointer ${
                    selectedView === "grid" ? "text-darkBlue" : "text-gray-300"
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
                  Showing {paginationResult()}
                </span>
              </div>
              {/* filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold ">Sort by:</span>
                <select
                  name="sort"
                  className="bg-gray-100 p-2 border outline-none font-medium"
                >
                  <option value="new_to_old">Newest to Oldest</option>
                  <option value="old_to_new">Oldest to Newest</option>
                  <option value="high_to_low">High to Low</option>
                  <option value="low_to_high">Low to High</option>
                </select>
              </div>
            </div>
            {/* view all magazines */}
            {activeCategory === "view_all" && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                {magazineLoading || subscriptionLoading ? (
                  <div className="loading col-span-full">Loading...</div>
                ) : allMagazinesAndSubscriptions?.length > 0 ? (
                  allMagazinesAndSubscriptions?.map((magazine) => (
                    <MagazineCard key={magazine?._id} data={magazine} />
                  ))
                ) : (
                  <div className="loading col-span-full">No Subscriptions here.</div>
                )}
              </div>
            )}
            {/* subscriptions  */}
            {activeCategory === "subscriptions" && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                {subscriptionLoading ? (
                  <div className="loading col-span-full">Loading...</div>
                ) : subscriptions?.length > 0 ? (
                  subscriptions?.map((subscription) => (
                    <MagazineCard key={subscription?._id} data={subscription} />
                  ))
                ) : (
                  <div className="loading col-span-full">No Subscriptions here.</div>
                )}
              </div>
            )}
            {/* magazines all */}
            {activeCategory === "magazines" && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                {magazineLoading ? (
                  <div className="loading col-span-full">Loading...</div>
                ) : magazines?.length > 0 ? (
                  magazines?.map((magazine) => (
                    <MagazineCard key={magazine?._id} data={magazine} />
                  ))
                ) : (
                  <div className="loading col-span-full">No Magazines here.</div>
                )}
              </div>
            )}
            {/* magazines issues */}
            {(activeCategory === "woodmag" ||
              activeCategory === "the_magazine_designer" ||
              activeCategory === "roofing_magazine" ||
              activeCategory === "craftsmen_&_wood") && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                {magazineLoading || subscriptionLoading ? (
                  <div className="loading col-span-full">Loading...</div>
                ) : magazines?.length > 0 ? (
                  magazines?.map((magazine) => (
                    <MagazineCard key={magazine?._id} data={magazine} />
                  ))
                ) : (
                  <div className="loading col-span-full">No Magazines here.</div>
                )}
              </div>
            )}

            <div className="flex xl:flex-row flex-col items-center w-full gap-3 ">
              <div className="w-full border border-BORDERGRAY bg-white p-3 flex md:flex-row flex-col gap-3 items-center justify-between">
                {/* pagination */}
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
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
