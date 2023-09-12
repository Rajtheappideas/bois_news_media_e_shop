import React, { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SimilarProducts = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="space-y-3 relative">
      <p className="heading">Similar Prodcuts</p>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={3.5}
        direction={"horizontal"}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          enabled: true,
        }}
        loop={false}
        observer={true}
        parallax={true}
        observeParents={true}
        onSwiper={(swiper) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;

            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        breakpoints={{
          1280: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 2.5,
          },
          240: {
            slidesPerView: 1.5,
          },
        }}
        className="py-8 "
      >
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-3.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-1.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-2.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-11.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-4.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
        <SwiperSlide className="space-y-3">
          <img
            src={require("../assests/images/Product image-8.png")}
            alt=""
            className="w-full xl:min-h-[28rem] md:min-h-[25rem] min-h-[20rem]  xl:max-h-[28rem] md:max-h-[25rem] max-h-[20rem] object-fill object-center"
          />
          <p className="font-semibold md:text-xl">
            Artisans & Wood subscription
          </p>
          <p className="font-semibold text-darkGray md:text-base">
            From € 45.00
          </p>
        </SwiperSlide>
      </Swiper>
      <button
        type="button"
        ref={prevRef}
        className="rounded-full md:p-3 p-2 bg-darkBlue  absolute top-1/2 -translate-y-1/2 xl:-left-4 md:left-4 left-0 z-20"
      >
        <AiOutlineLeft className="w-6 h-6 text-white" />
      </button>
      <button
        type="button"
        ref={nextRef}
        className="rounded-full md:p-3 p-2 absolute bg-darkBlue top-1/2 -translate-y-1/2 xl:-right-4 md:right-4 right-0 z-20"
      >
        <AiOutlineRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default SimilarProducts;
