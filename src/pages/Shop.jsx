import React from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import Categories from "../components/Categories";
import { BsFillGridFill } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import MagazineCard from "../components/MagazineCard";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeGridView } from "../redux/ShopSlice";
import SubscriptionDetails from "../components/SubscriptionDetails";
import MagazineDetails from "../components/MagazineDetails";

const Shop = () => {
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

  // console.log(magazines, subscriptions);

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
            {(activeCategory === "WOODmag" ||
              activeCategory === "The_magazine_designer" ||
              activeCategory === "Magazine_roof" ||
              activeCategory === "Craftsmen_Wood") && (
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
            )}
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
                  Showing 1–12 of 171 results
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
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => (
                    <MagazineCard key={subscription?._id} data={subscription} />
                  ))
                ) : (
                  <div className="loading">No Subscriptions here.</div>
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
                {subscriptions.length > 0 ? (
                  subscriptions.map((subscription) => (
                    <MagazineCard key={subscription?._id} data={subscription} />
                  ))
                ) : (
                  <div className="loading">No Subscriptions here.</div>
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
                {magazines.length > 0 ? (
                  magazines.map((magazine) => (
                    <MagazineCard key={magazine?._id} data={magazine} />
                  ))
                ) : (
                  <div className="loading">No Magazines here.</div>
                )}
              </div>
            )}
            {/* magazines issues */}
            {(activeCategory === "WOODmag" ||
              activeCategory === "The_magazine_designer" ||
              activeCategory === "Magazine_roof" ||
              activeCategory === "Craftsmen_Wood") && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                {magazines.length > 0 ? (
                  magazines.map((magazine) => (
                    <MagazineCard key={magazine?._id} data={magazine} />
                  ))
                ) : (
                  <div className="loading">No Magazines here.</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
