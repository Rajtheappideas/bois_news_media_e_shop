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

  // pagination logic
  const magazinesPerPage = 12;
  const pageVisited = pageNumber * magazinesPerPage;
  let displayMagazines = displayAccordingToCategory().slice(
    pageVisited,
    magazinesPerPage + pageVisited
  );
  const pageCount = Math.ceil(
    displayAccordingToCategory().length / magazinesPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function displayAccordingToCategory() {
    if (activeCategory === "view_all") {
      return allMagazinesAndSubscriptions;
    } else if (activeCategory === "subscriptions") {
      return subscriptions;
    } else if (activeCategory === "magazines") {
      return magazines;
    } else if (activeCategory === "boismag") {
      return (
        magazines.length > 0 &&
        magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("boismag")
        )
      );
    } else if (activeCategory === "agenceur") {
      return (
        magazines.length > 0 &&
        magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("agenceur")
        )
      );
    } else if (activeCategory === "artisans&bois") {
      return (
        magazines.length > 0 &&
        magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("artisans&bois")
        )
      );
    } else if (activeCategory === "toiture") {
      return (
        magazines.length > 0 &&
        magazines.filter((magazine) =>
          magazine?.magazineTitle.includes("toiture")
        )
      );
    }
  }

  function paginationResult() {
    return `${
      displayMagazines?.length > 0
        ? pageNumber * magazinesPerPage === 0
          ? 1
          : pageNumber * magazinesPerPage + 1
        : 0
    } - ${
      !displayMagazines
        ? 0
        : displayMagazines?.length < magazinesPerPage
        ? displayMagazines?.length
        : magazinesPerPage * (pageNumber + 1) > displayMagazines?.length
        ? displayMagazines?.length
        : magazinesPerPage * (pageNumber + 1)
    } of ${displayMagazines?.length ?? 0} results`;
  }

  function handleFilter() {
    if (activeFilter === "new_to_old") {
      return setShowMagazines(displayMagazines);
    } else if (activeFilter === "old_to_new") {
      return setShowMagazines(displayMagazines?.slice()?.reverse());
    } else if (activeFilter === "high_to_low") {
      displayMagazines?.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (activeFilter === "low_to_high") {
      displayMagazines?.sort((a, b) => {
        return a.price - b.price;
      });
    }
  }

  useEffect(() => {
    setShowMagazines(displayMagazines);
    handleFilter();
  }, [activeCategory, activeFilter]);

  return (
    <div className="Container space-y-5 lg:py-10 py-5">
      {/* <HeadNavigationLink /> */}

      {/* magazine or subscription Detais */}
      {showMagazineOrSubscriptionDetails && <MagazineOrSubscriptionDetails />}
      {!showMagazineOrSubscriptionDetails && (
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
                  onChange={(e) => {
                    setActiveFilter(e.target.value);
                  }}
                >
                  <option value="new_to_old">Newest to Oldest</option>
                  <option value="old_to_new">Oldest to Newest</option>
                  <option value="high_to_low">High to Low</option>
                  <option value="low_to_high">Low to High</option>
                </select>
              </div>
            </div>

            <div
              className={`w-full py-4 ${
                selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
              } grid  place-items-start items-start md:gap-5 gap-3`}
            >
              {magazineLoading || subscriptionLoading ? (
                <div className="loading col-span-full">Loading...</div>
              ) : displayMagazines?.length > 0 ? (
                showMagazines?.map((magazine) => (
                  <MagazineCard key={magazine?._id} data={magazine} />
                ))
              ) : (
                <div className="loading col-span-full">
                  No Subscriptions or Magazines here.
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
