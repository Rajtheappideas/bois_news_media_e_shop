import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { PublicS3Url } from "../BaseUrl";
import {
  handleChangeMagazineOrSubscriptionShow,
  handleChangeSingleMagazineOrSubscription,
} from "../redux/ShopSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SimilarProducts = ({ similarMagazines }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { t } = useTranslation();

  const handleDispatchAction = (type, id) => {
    dispatch(handleChangeMagazineOrSubscriptionShow(true));
    dispatch(
      handleChangeSingleMagazineOrSubscription({
        id,
        type,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (!location.pathname.includes("shop")) return navigate("shop");
    }, 300);
  };

  return (
    <div className="space-y-3 relative">
      <p className="heading">{t("Similar Prodcuts")}</p>
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
        {similarMagazines.map((magazine) => (
          <SwiperSlide key={magazine?._id} className="space-y-3">
            <div
              onClick={() =>
                handleDispatchAction(
                  magazine?.magazineId ? "magazine" : "subscription",
                  magazine?._id
                )
              }
              className={`md:space-y-2 space-y-1 md:text-left text-center w-full cursor-pointer md:border-0 md:p-0 p-3`}
            >
              <img
                src={PublicS3Url.concat(magazine?.image)}
                alt={magazine?.title}
                className={`w-fit hover:scale-105 transition-all duration-300 lg:max-h-[25rem] max-h-[20rem] md:min-h-[25rem] sm:min-h-[20rem] min-h-[15rem] object-contain object-center`}
                loading="lazy"
              />
              <p className="font-semibold md:text-lg text-center">
                {magazine?.title}
              </p>

              <p className="font-semibold md:text-xl text-lg text-darkBlue text-center">
                {t("From")} € {magazine?.pricePaper}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        ref={prevRef}
        className="rounded-full md:p-3 p-1 bg-darkBlue  absolute top-1/2 -translate-y-1/2 xl:-left-4 md:-left-3 -left-2 z-20"
      >
        <AiOutlineLeft className="w-6 h-6 text-white" />
      </button>
      <button
        type="button"
        ref={nextRef}
        className="rounded-full md:p-3 p-1 absolute bg-darkBlue top-1/2 -translate-y-1/2 xl:-right-4 lg:-right-3 md:-right-2 right-0 z-20"
      >
        <AiOutlineRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default SimilarProducts;
