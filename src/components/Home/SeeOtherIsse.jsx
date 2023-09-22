import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SeeOtherIsse = () => {
  return (
    <div className="bg-lighBlue text-white">
      <Link to="/shop">
        <div className="Container font-semibold lg:text-3xl md:text-2xl p-10 flex items-center gap-2 flex-wrap justify-center">
          SEE OTHER ISSUES <FaAnglesRight size={20} color="white" />
        </div>
      </Link>
    </div>
  );
};

export default SeeOtherIsse;
