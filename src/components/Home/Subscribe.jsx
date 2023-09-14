import React from "react";

const SubScribe = () => {
  return (
    <div className="Container md:space-y-5 space-y-2">
      <p className="heading">SUBSCRIBE</p>
      <div className="grid lg:grid-cols-2 place-items-start items-start lg:gap-5 gap-3">
        <div className="w-full border rounded-lg md:p-3 p-2 flex md:flex-row flex-col items-start md:gap-3 gap-1">
          <img
            src={require("../../assests/images/Product image.png")}
            alt="product_image"
            className="md:w-1/2 w-full 2xl:h-96 lg:h-80 h-60 object-contain object-center rounded-lg"
          />
          {/* descritpion */}
          <div className="md:space-y-3 space-y-2 tracking-normal md:text-lg text-sm font-medium">
            <p className="text-lg font-semibold">BOISmag:</p>
            <p>
              Professional magazine on the news of wood professionals (industry,
              trade and construction).
            </p>
            <p>
              Readership: Craftsmen, trading and distribution executives,
              building engineers and technicians, architects, design offices,
              business leaders, teachers/students.
            </p>
            <button className="gray_button uppercase md:w-48 w-full">
              i SubScribe
            </button>
          </div>
        </div>
        <div className="w-full border rounded-lg md:p-3 p-2 flex md:flex-row flex-col items-start md:gap-3 gap-1">
          <img
            src={require("../../assests/images/Product image-1.png")}
            alt="product_image"
            className="md:w-1/2 w-full 2xl:h-96 lg:h-80 h-60 object-contain object-center rounded-lg"
          />
          {/* descritpion */}
          <div className="md:space-y-3 space-y-2 tracking-normal md:text-base text-sm font-medium">
            <p className="text-lg font-semibold">BOISmag:</p>
            <p>
              Professional magazine on the news of wood professionals (industry,
              trade and construction).
            </p>
            <p>
              Readership: Craftsmen, trading and distribution executives,
              building engineers and technicians, architects, design offices,
              business leaders, teachers/students.
            </p>
            <button className="gray_button uppercase md:w-48 w-full">
              i SubScribe
            </button>
          </div>
        </div>
        <div className="w-full border rounded-lg md:p-3 p-2 flex md:flex-row flex-col items-start md:gap-3 gap-1">
          <img
            src={require("../../assests/images/Product image-3.png")}
            alt="product_image"
            className="md:w-1/2 w-full 2xl:h-96 lg:h-80 h-60 object-contain object-center rounded-lg"
          />
          {/* descritpion */}
          <div className="md:space-y-3 space-y-2 tracking-normal md:text-base text-sm font-medium">
            <p className="text-lg font-semibold">BOISmag:</p>
            <p>
              Professional magazine on the news of wood professionals (industry,
              trade and construction).
            </p>
            <p>
              Readership: Craftsmen, trading and distribution executives,
              building engineers and technicians, architects, design offices,
              business leaders, teachers/students.
            </p>
            <button className="gray_button uppercase md:w-48 w-full">
              i SubScribe
            </button>
          </div>
        </div>
        <div className="w-full border rounded-lg md:p-3 p-2 flex md:flex-row flex-col items-start md:gap-3 gap-1">
          <img
            src={require("../../assests/images/Product image-5.png")}
            alt="product_image"
            className="md:w-1/2 w-full 2xl:h-96 lg:h-80 h-60 object-contain object-center rounded-lg"
          />
          {/* descritpion */}
          <div className="md:space-y-3 space-y-2 tracking-normal md:text-base text-sm font-medium">
            <p className="text-lg font-semibold">BOISmag:</p>
            <p>
              Professional magazine on the news of wood professionals (industry,
              trade and construction).
            </p>
            <p>
              Readership: Craftsmen, trading and distribution executives,
              building engineers and technicians, architects, design offices,
              business leaders, teachers/students.
            </p>
            <button className="gray_button uppercase md:w-48 w-full">
              i SubScribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubScribe;
