import React, { useEffect, useState } from "react";
import { LiaLongArrowAltUpSolid } from "react-icons/lia";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    });

    return () => window.removeEventListener("scroll", () => {});
  }, [window.scrollY]);

  return (
    <div
      onClick={scrollToTop}
      className={`${
        showButton ? "scale-100 animate-bounce" : "scale-0"
      } fixed z-10 bottom-5 right-5 cursor-pointer transition-all duration-300 rounded-full bg-darkBlue py-3 px-2 w-auto text-white text-center`}
    >
      <LiaLongArrowAltUpSolid size={30} />
    </div>
  );
};

export default ScrollToTop;
