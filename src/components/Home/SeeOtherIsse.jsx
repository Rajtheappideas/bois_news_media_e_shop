import React from "react";
import { FaAnglesRight } from "react-icons/fa6";

const SeeOtherIsse = () => {
  return (
    <div className="bg-lighBlue text-white">
      <div className="Container cursor-pointer font-semibold lg:text-3xl md:text-2xl p-10 flex items-center gap-2 flex-wrap justify-center">
        SEE OTHER ISSUES <FaAnglesRight size={20} color="white" />
      </div>
    </div>
  );
};

export default SeeOtherIsse;
