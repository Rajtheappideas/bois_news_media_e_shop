import React from "react";
import { useTranslation } from "react-i18next";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SeeOtherIsse = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-lighBlue text-white">
      <Link to="/shop">
        <div className="Container uppercase font-semibold lg:text-3xl md:text-2xl p-10 flex items-center gap-2 flex-wrap justify-center">
          {t("SEE OTHER ISSUES")} <FaAnglesRight size={20} color="white" />
        </div>
      </Link>
    </div>
  );
};

export default SeeOtherIsse;
