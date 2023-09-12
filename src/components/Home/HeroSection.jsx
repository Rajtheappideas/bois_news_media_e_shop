import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full relative">
      <img
        src={require("../../assests/images/Banner2.png")}
        alt="banner"
        className="w-full xl:h-fit lg:h-96 h-80 object-cover object-center"
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-full lg:space-y-5 space-y-3">
        {/* text */}
        <div className="text-white Container tracking-normal 2xl:space-y-7 md:space-y-3 space-y-1">
          <p className="xl:text-5xl lg:text-4xl md:text-3xl text-xl font-semibold">
            SUBSCRIBE TO
          </p>
          <p className="xl:text-5xl lg:text-4xl md:text-3xl text-xl font-semibold">
            MULTIPLE MAGAZINES
          </p>
          <p className="lg:text-2xl md:text-xl text-xs font-medium tracking-wide">
            AND GET A DISCOUNT
          </p>
        </div>
        {/* round circles */}
        <div className="Container flex items-center lg:gap-10 gap-5 flex-wrap">
          <div className="text-center space-y-2 text-white">
            <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-white bg-yellow-500">
              - 15 €
            </p>
            <p className="md:text-base text-xs">
              On <br />2 TRACKS
            </p>
          </div>
          <div className="text-center space-y-2 text-white">
            <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-white bg-yellow-500">
              - 30 €
            </p>
            <p className="md:text-base text-xs">
              On <br />3 TRACKS
            </p>
          </div>
          <div className="text-center space-y-2 text-white">
            <p className="lg:w-20 lg:h-20 h-16 w-16 lg:leading-[5rem] leading-[4rem] text-black lg:text-xl font-semibold text-center  align-middle rounded-full outline-dotted outline-4 outline-white bg-yellow-500">
              - 40 €
            </p>
            <p className="md:text-base text-xs">
              On <br />4 TRACKS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
