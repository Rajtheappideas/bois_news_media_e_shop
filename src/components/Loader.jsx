import Lottie from "lottie-react";
import React from "react";
import loading from "../assests/animations/loading.json";

const Loader = () => {
  return (
    <>
      <div className="fixed h-screen w-screen z-50 inset-0 bg-gray-50/10 backdrop-blur-sm"></div>
      <Lottie
        style={{
          pointerEvents: "none",
        }}
        className="fixed top-1/2 left-1/2 cuno -translate-y-1/2 -translate-x-1/2 z-50 lg:h-96 lg:w-96 h-60  w-60"
        animationData={loading}
        loop
      />
    </>
  );
};

export default Loader;
