import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { handleChangeMagazineShow } from "../redux/ShopSlice";
import SimilarProducts from "./SimilarProducts";

const MagazineDetails = () => {
  const [activeComponent, setActiveComponent] = useState("description");

  const dispatch = useDispatch();

  return (
    <div className="w-full lg:space-y-7 md:space-y-5 space-y-3">
      {/* back btn */}
      <BsArrowLeft
        size={25}
        role="button"
        onClick={() => dispatch(handleChangeMagazineShow(false))}
      />
      {/* img + add to cart details */}
      <div className="w-full flex md:flex-row flex-col items-start justify-start gap-3">
        <img
          src={require("../assests/images/Product image-11.png")}
          alt=""
          className="md:w-1/2 w-full 2xl:h-[30rem] h-[28rem] object-contain object-center"
        />
        <div className="md:w-2/3 w-full md:space-y-4 space-y-2">
          <p className="font-semibold md:text-xl text-lg text-left">
            BOISmag subscription
          </p>
          <p className="font-semibold md:text-lg text-darkBlue">From € 95.00</p>
          {/* type of support */}
          <div className="w-full flex items-center gap-3 font-semibold">
            <p className="md:w-3/12 md:text-base text-sm">Type of support</p>
            <select name="type_of_support" className="border p-2 w-full">
              <option value="paper_&_digital">Paper and Digital</option>
              <option value="paper">Paper</option>
              <option value="digital">Digital</option>
            </select>
          </div>
          {/* shipping area */}
          <div className="w-full flex items-center gap-3 font-semibold">
            <p className="md:w-3/12 md:text-base text-sm">Shipping area</p>
            <select name="shipping_area" className="border p-2 w-full">
              <option value="EEC / Switzerland / Dom-tom&_digital">
                EEC / Switzerland / Dom-tom
              </option>
              <option value="option1">option1</option>
              <option value="option2">option2</option>
            </select>
          </div>
          {/* qty */}
          <div className="w-full flex items-center gap-3 font-semibold">
            <p className="md:w-3/12 md:text-base text-sm">Quantity</p>
            <input
              type="number"
              placeholder="1"
              className="w-full p-2 border outline-none"
            />
          </div>
          {/* price */}
          <p className="font-semibold md:text-xl text-lg">
            Price:
            <span className="text-darkBlue">€ 140.00</span>
          </p>
          {/* btn */}
          <button className="w-full gray_button md:h-12 h-10">+ Add to cart</button>
          {/* btn */}
          <button className="w-full blue_button md:h-12 uppercase h-10">
            see an extract from the magazine
          </button>
        </div>
      </div>
      {/* tab btns */}
      <div className="w-full border-b-2 flex items-center gap-3 md:text-base text-sm">
        <p
          className={`${
            activeComponent === "description"
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue"
              : "font-medium"
          } cursor-pointer transition-all duration-100`}
          onClick={() => setActiveComponent("description")}
        >
          Description
        </p>
        <p
          className={`${
            activeComponent === "further_info"
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue"
              : "font-medium"
          } cursor-pointer transition-all duration-100`}
          onClick={() => setActiveComponent("further_info")}
        >
          Further information
        </p>
      </div>
      {/* description */}
      {activeComponent === "description" && (
        <div className="md:space-y-4  space-y-2">
          <p className="md:text-lg">
            <b>EDITORIAL</b>
          </p>
          <p className="font-medium md:text-lg">SUMMER LULL</p>
          <p className="md:text-base text-sm lg:text-left text-justify">
            For the past few weeks, the return of fine weather and the summer
            atmosphere that has reigned over France have marked the end of a
            rather calm first half of 2023 for the sector.Far from the
            post-Covid outpouring of 2021 and 2022, and the double-digit growth
            of many companies, forest and wood professionals have experienced a
            very - even too - sluggish period in recent months with a drop in
            the global demand for wood, which has led in its wake to falling
            prices for many products. If the conflict in Ukraine came to play
            spoilsport at the beginning of last year, destabilizing for some
            time the world trade in timber from the North, the situation quickly
            returned to normal and the lack of timber from countries under
            embargo was quickly reduced, sometimes even causing overstocks among
            certain manufacturers and distributors who tried to buy in quantity
            to avoid a possible shortage!Today, the slowdown in new construction
            across the globe leaves professionals perplexed, with no real
            visibility as to a possible restart of the sector! In France, the
            situation is hardly more encouraging: “It is the first time in more
            than 20 years that the objectives set by the Government have not
            been achieved. With the key, a real risk of crisis in the
            construction sector, said Thierry Ducros, president of the UMB-FFB,
            during the general assembly of the Federation (see article p. 16).If
            we don't get this message across quickly, the Government risks
            killing the goose that lays the golden egg. The same phenomenon for
            trade, but also for the cladding or decking markets, which are
            dropping after two euphoric years despite very optimistic forecasts
            published at the start of 2022.Although no one knows today the
            outcome of this gloomy context, a few positive signs nevertheless
            allow us to glimpse certain notes of optimism: the words
            decarbonization and biosourced materials are on everyone's lips
            today and the recovery of the building will go into priority through
            ecological and low-energy solutions. The deployment of the RE2020
            and the government's finally declared support for our material
            foreshadows an increase in the market share of wood in construction
            and fittings over the next few years. The demonstration sites of
            Notre-Dame de Paris and the 2024 Paris Games offer italso an
            unprecedented planetary visibility. Finally, the investments still
            at work within the sector testify to the desire of professionals to
            project themselves into the future, and to increase their skills and
            production capacities to be more than ever ready to support the
            rebound of the demand in France and abroad.While waiting for a
            resumption of activity, the entire BOISmag team invites you to take
            advantage of this lull to have a good vacation and a beautiful
            summer, and above all to recharge your batteries to start the new
            school year at full speed...
          </p>
          <p className="font-semibold md:text-lg">NEWS</p>
          <p>
            5 News from the sector,
            <br /> construction, trading,
            <br /> equipment manufacturers, etc.
          </p>
          <p>
            <b>8 AGENDA</b> <br /> <b>9 APPOINTMENTS</b>
          </p>
        </div>
      )}
      {/*further info */}
      {activeComponent === "further_info" && (
        <div className="md:space-y-4 space-y-2">
          <p>
            <span>
              <b>Type of support:</b>
            </span>{" "}
            &nbsp;
            <span>Digital (pdf), Paper and digital (pdf)</span>
          </p>
          <p>
            <span>
              <b>Shipping area:</b>
            </span>{" "}
            &nbsp;
            <span>
              EEC / Switzerland / Dom-tom, Metropolitan France, Rest of the
              world
            </span>
          </p>
        </div>
      )}
      {/* similar products */}
      <SimilarProducts />
    </div>
  );
};

export default MagazineDetails;
