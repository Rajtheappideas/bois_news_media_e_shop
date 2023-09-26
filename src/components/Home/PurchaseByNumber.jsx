import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handleChangeActiveCategory,
  handleChangeMagazineOrSubscriptionShow,
} from "../../redux/ShopSlice";
import BaseUrl from "../../BaseUrl";
import MagazineCard from "../MagazineCard";

const PurchaseByNumber = ({
  bgColor,
  from,
  to,
  titleImg,
  category,
  magazines,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    dispatch(handleChangeActiveCategory(category));
    navigate("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(${from}, ${to})`,
      }}
      className="w-full md:p-10 p-5 text-white md:space-y-5 space-y-3"
    >
      <div className="md:space-y-5 space-y-3 Container">
        <p className="heading text-center">PURCHASE BY NUMBER</p>
        <img
          src={titleImg}
          alt="bois_magazine"
          className="magazine_img_title"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 items-start place-items-start md:gap-5 gap-3">
          {magazines?.map((magazine) => (
            <MagazineCard data={magazine} from="purchase_by_number" />

            // <div
            //   key={magazine?._id}
            //   className="w-full h-auto md:space-y-3 space-y-1"
            //   onClick={()=>{}}
            // >
            //   <img
            //     src={BaseUrl.concat(magazine?.image)}
            //     alt={magazine?.title}
            //     className="w-full 2xl:h-[30rem] lg:h-96 h-80 object-contain object-center"
            //     loading="lazy"
            //   />
            //   <p className="md:text-lg text-sm w-48 text-center font-medium mx-auto">
            //     {magazine?.title}
            //   </p>
            // </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop" onClick={() => handleOnClick()}>
            <button className="bg-white active:scale-90 transition-all duration-100 hover:bg-black hover:text-white text-black text-center rounded-lg lg:w-1/4 md:w-1/3 font-medium p-2">
              Discover previous issues
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseByNumber;
