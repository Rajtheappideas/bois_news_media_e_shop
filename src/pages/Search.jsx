import React from "react";

const Search = () => {
  return (
    <div className="Container lg:space-y-7 md:space-y-5 space-y-3 lg:py-10 py-7">
      <p className="md:text-lg lg:pt-8 pt-4 pb-4">
        <b>Search result found:</b>
        Roof
      </p>
      <div className="flex md:flex-row flex-col items-start justify-start gap-3">
        <img
          src={require("../assests/images/Product image-2.png")}
          alt="Product"
          className="w-fit lg:h-72 h-60 object-cover object-center mx-auto"
        />
        <div className="md:space-y-3 space-y-2">
          <p className="font-semibold md:text-xl md:text-left text-center">
            Magazine roof n°28
          </p>
          <p className="font-medium md:text-left text-center">01/01/70</p>
          <p className="tracking-wide font-medium leading-normal md:text-left text-justify">
            EDITO Summer lull For the past few weeks, the return of fine weather
            and the summer atmosphere that has reigned over France have marked
            the end of a rather calm first half of 2023 for the sector. Far from
            the post-Covid outpouring of 2021 and 2022, and the double-digit
            growth of many companies, forest and wood...
          </p>
          <div className="md:text-left text-center">
            <button className="capitalize gray_button md:w-40 w-1/2">
              Read more
            </button>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col items-start justify-start gap-3">
        <img
          src={require("../assests/images/Product image-8.png")}
          alt="Product"
          className="w-fit lg:h-72 h-60 object-cover object-center mx-auto"
        />
        <div className="md:space-y-3 space-y-2">
          <p className="font-semibold md:text-xl md:text-left text-center">
            Magazine roof n°28
          </p>
          <p className="font-medium md:text-left text-center">01/01/70</p>
          <p className="tracking-wide font-medium leading-normal md:text-left text-justify">
            EDITO Summer lull For the past few weeks, the return of fine weather
            and the summer atmosphere that has reigned over France have marked
            the end of a rather calm first half of 2023 for the sector. Far from
            the post-Covid outpouring of 2021 and 2022, and the double-digit
            growth of many companies, forest and wood...
          </p>
          <div className="md:text-left text-center">
            <button className="capitalize gray_button md:w-40 w-1/2">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
