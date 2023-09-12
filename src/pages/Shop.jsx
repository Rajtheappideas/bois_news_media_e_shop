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
  } = useSelector((state) => state.root.shop);

  const dispatch = useDispatch();

  return (
    <div className="Container space-y-5 lg:py-10 py-5">
      <HeadNavigationLink />
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
              "The_magazine_designer" ||
              "Magazine_roof" ||
              "Craftsmen_Wood") && (
              <div className="space-y-3">
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
                <MagazineCard
                  description="EDITO Summer lull For the past few weeks, the return of fine weather and the
              summer atmosphere that has reigned over France have marked the end of
              a rather calm first half of 2023 for the sector. Far from the post-Covid
              outpouring of 2021 and 2022, and the double-digit growth of many
              companies, forest and wood professionals"
                  title="BOISmag n°213"
                  price="12.00"
                  image={require("../assests/images/Product image-1.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="The fitter n°69"
                  price="12.00"
                  image={require("../assests/images/Product image-11.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="Craftsmen & Wood n°72"
                  price="12.00"
                  image={require("../assests/images/Product image-3.png")}
                />
              </div>
            )}
            {/* subscriptions  */}
            {activeCategory === "subscriptions" && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                <MagazineCard
                  description="EDITO Summer lull For the past few weeks, the return of fine weather and the
              summer atmosphere that has reigned over France have marked the end of
              a rather calm first half of 2023 for the sector. Far from the post-Covid
              outpouring of 2021 and 2022, and the double-digit growth of many
              companies, forest and wood professionals"
                  title="BOISmag n°213"
                  price="12.00"
                  image={require("../assests/images/Product image-2.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="The fitter n°69"
                  price="12.00"
                  image={require("../assests/images/Product image-3.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="Craftsmen & Wood n°72"
                  price="12.00"
                  image={require("../assests/images/Product image-6.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="Craftsmen & Wood n°72"
                  price="12.00"
                  image={require("../assests/images/Product image-8.png")}
                />
              </div>
            )}
            {/* magazines all */}
            {activeCategory === "magazines" && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                <MagazineCard
                  description="EDITO Summer lull For the past few weeks, the return of fine weather and the
              summer atmosphere that has reigned over France have marked the end of
              a rather calm first half of 2023 for the sector. Far from the post-Covid
              outpouring of 2021 and 2022, and the double-digit growth of many
              companies, forest and wood professionals"
                  title="MAGAZINE ROOF(24)"
                  image={require("../assests/images/Product image-2.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="CRAFTSMEN & WOOD(30)"
                  image={require("../assests/images/Product image-3.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="THE MAGAZINE DESIGNER(40)"
                  image={require("../assests/images/Product image-6.png")}
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="WOODMAG(72)"
                  image={require("../assests/images/Product image-8.png")}
                />
              </div>
            )}
            {/* magazines issues */}
            {(activeCategory === "WOODmag" ||
              "The_magazine_designer" ||
              "Magazine_roof" ||
              "Craftsmen_Wood") && (
              <div
                className={`w-full py-4 ${
                  selectedView === "grid" && "xl:grid-cols-3 md:grid-cols-2"
                } grid  place-items-start items-start md:gap-5 gap-3`}
              >
                <MagazineCard
                  description="EDITO Summer lull For the past few weeks, the return of fine weather and the
              summer atmosphere that has reigned over France have marked the end of
              a rather calm first half of 2023 for the sector. Far from the post-Covid
              outpouring of 2021 and 2022, and the double-digit growth of many
              companies, forest and wood professionals"
                  title="MAGAZINE ROOF(24)"
                  image={require("../assests/images/Product image-10.png")}
                  price="13"
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="CRAFTSMEN & WOOD(30)"
                  image={require("../assests/images/Product image-8.png")}
                  price="12"
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="THE MAGAZINE DESIGNER(40)"
                  image={require("../assests/images/Product image-7.png")}
                  price="23"
                />
                <MagazineCard
                  description="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              optio impedit quibusdam repudiandae, soluta quo eaque suscipit
              tempore fugiat dolore quia deserunt odio commodi voluptatum,
              officia sequi nihil, ullam vel."
                  title="WOODMAG(72)"
                  image={require("../assests/images/Product image.png")}
                  price="30"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
