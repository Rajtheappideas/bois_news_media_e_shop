import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { handleChangeSubscriptionShow } from "../redux/ShopSlice";
import SimilarProducts from "./SimilarProducts";

const SubscriptionDetails = () => {
  const [activeComponent, setActiveComponent] = useState("description");

  const dispatch = useDispatch();

  return (
    <div className="w-full lg:space-y-7 md:space-y-5 space-y-3">
      {/* back btn */}
      <BsArrowLeft
        size={25}
        role="button"
        onClick={() => dispatch(handleChangeSubscriptionShow(false))}
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
          <button className="w-full gray_button h-12">+ Add to cart</button>
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
          <p className="font-semibold md:text-lg">
            8 issues/year – €115 (metropolitan France)
          </p>
          <p>
            Review on the latest news from wood professionals (INDUSTRY - TRADE
            - CONSTRUCTION) Topics covered: sawmill, equipment, wood energy,
            carpentry, logging, parquet, terrace, panels, wood treatment, etc.
          </p>
          <p>
            Take advantage of discounts by subscribing to our other magazines:{" "}
            <br /> <b>2 titles:</b>
            -€15 – <b>3 titles:</b>
            -€30 – <b>4 titles:</b>- €40
          </p>
          <p>
            Example for metropolitan France: Subscribe{" "}
            <b>to Boismag (€115) + Artisans&bois (€55), subscription at €155</b>
            instead of €170
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

export default SubscriptionDetails;
