import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeMagazineOrSubscriptionShow } from "../redux/ShopSlice";
import SimilarProducts from "./SimilarProducts";
import BaseUrl from "../BaseUrl";
import { useEffect } from "react";

const MagazineOrSubscriptionDetails = () => {
  const [activeComponent, setActiveComponent] = useState("description");
  const [similarMagazines, setSimilarMagazines] = useState([]);

  const dispatch = useDispatch();

  const { singleMagazineOrSubscription, allMagazinesAndSubscriptions } =
    useSelector((state) => state.root.shop);

  useEffect(() => {
    setSimilarMagazines(
      allMagazinesAndSubscriptions.filter((m) =>
        m?.magazineTitle.includes(singleMagazineOrSubscription?.magazineTitle)
      )
    );
  }, []);

  return (
    <div className="w-full lg:space-y-7 md:space-y-5 space-y-3">
      {/* back btn */}
      <BsArrowLeft
        size={25}
        role="button"
        onClick={() => dispatch(handleChangeMagazineOrSubscriptionShow(false))}
      />
      {/* img + add to cart details */}
      <div className="w-full flex lg:flex-row flex-col items-start justify-start md:gap-5 gap-3">
        <img
          // src={require("../assests/images/Product image-11.png")}
          src={BaseUrl.concat(singleMagazineOrSubscription?.image)}
          alt={singleMagazineOrSubscription?.title}
          className="lg:w-1/2 w-full max-h-[25rem] object-contain object-center"
          loading="lazy"
        />
        <div className="lg:w-2/3 w-full md:space-y-4 space-y-2">
          <p className="font-semibold md:text-xl text-lg lg:text-left text-center">
            {singleMagazineOrSubscription?.title}
          </p>
          <p className="font-semibold md:text-lg lg:text-left text-center text-darkBlue">
            From € {singleMagazineOrSubscription?.price}.00
          </p>
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
              <option value="Metropolitan France">Metropolitan France</option>
              <option value=" Rest of the world"> Rest of the world</option>
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
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue bg-gray-100 p-1"
              : "font-medium"
          } cursor-pointer transition-all duration-100`}
          onClick={() => setActiveComponent("description")}
        >
          Description
        </p>
        <p
          className={`${
            activeComponent === "further_info"
              ? "text-darkBlue font-semibold border-b-2 border-darkBlue bg-gray-100 p-1"
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
          {singleMagazineOrSubscription?.description}
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
      {similarMagazines.length > 0 && (
        <SimilarProducts similarMagazines={similarMagazines} />
      )}
    </div>
  );
};

export default MagazineOrSubscriptionDetails;
