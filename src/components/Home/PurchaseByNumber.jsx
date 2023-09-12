import React from "react";

const PurchaseByNumber = ({
  bgColor,
  from,
  to,
  titleImg,
  img1,
  img2,
  img3,
  title1,
  title2,
  title3,
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(${from}, ${to})`,
      }}
      className="w-full md:p-10 p-5 text-white md:space-y-5 space-y-3"
    >
      <p className="heading text-center">PURCHASE BY NUMBER</p>
      <img src={titleImg} alt="bois_magazine" className="magazine_img_title" />

      <div className="flex items-start lg:justify-center justify-center md:gap-5 gap-3 flex-wrap">
        <div className="lg:w-1/4 md:w-1/3 w-full h-auto md:space-y-3 space-y-1">
          <img
            src={img1}
            alt="product_image"
            className="w-full 2xl:h-[30rem] lg:h-96 h-80 object-contain object-center"
            loading="lazy"
          />
          <p className="md:text-lg text-sm w-48 text-center font-medium mx-auto">
            {title1}
          </p>
        </div>
        <div className="lg:w-1/4 md:w-1/3 w-full h-auto md:space-y-3 space-y-1">
          <img
            src={img2}
            alt="product_image"
            className="w-full 2xl:h-[30rem] lg:h-96 h-80 object-contain object-center"
            loading="lazy"
          />
          <p className="md:text-lg text-sm w-48 text-center font-medium mx-auto">
            {title2}
          </p>
        </div>
        <div className="lg:w-1/4 md:w-1/3 w-full h-auto md:space-y-3 space-y-1">
          <img
            src={img3}
            alt="product_image"
            className="w-full 2xl:h-[30rem] lg:h-96 h-80 object-contain object-center"
            loading="lazy"
          />
          <p className="md:text-lg text-sm w-48 text-center font-medium mx-auto">
            {title3}
          </p>
        </div>
      </div>
      <div className="text-center">
        <button className="bg-white active:scale-90 transition-all duration-100 hover:bg-black hover:text-white text-black text-center rounded-lg lg:w-1/4 md:w-1/3 font-medium p-2">
          Discover previous issues
        </button>
      </div>
    </div>
  );
};

export default PurchaseByNumber;
