import React from "react";
import { useTranslation } from "react-i18next";
import { FaAnglesRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleChangeMagazineOrSubscriptionShow } from "../../redux/ShopSlice";

const SeeOtherIsse = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className="bg-lighBlue text-white">
      <Link
        to="/shop"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          dispatch(handleChangeMagazineOrSubscriptionShow(false));
        }}
      >
        <div className="Container uppercase font-semibold lg:text-3xl md:text-2xl p-10 flex items-center gap-2 flex-wrap justify-center">
          {t("SEE OTHER ISSUES")} <FaAnglesRight size={20} color="white" />
        </div>
      </Link>
    </div>
  );
};

export default SeeOtherIsse;
