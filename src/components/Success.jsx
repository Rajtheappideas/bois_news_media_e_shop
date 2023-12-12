import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import success from "../assests/animations/success.json";
import { PublicS3Url } from "../BaseUrl";

const Success = ({ title, price, image, description, btnText, link }) => {
  return (
    <div>
      {/* bg img + heading */}
      <div className="relative md:h-80 h-60">
        <img
          src={require("../assests/images/terms.png")}
          alt="terms"
          className="w-screen h-full object-cover object-left"
          loading="lazy"
        />
      </div>
      <section className="md:Container mt-5 bg-white drop-shadow-2xl rounded-xl md:px-5 md:py-5 px-4 py-2 flex items-center flex-col mx-auto md:w-1/2 w-11/12  h-auto gap-y-2">
        <Lottie
          style={{
            pointerEvents: "none",
          }}
          animationData={success}
          loop
          className="h-40 w-fit"
        />
        {image && (
          <div className="flex items-center justify-center gap-10 w-full">
            {image && (
              <img
                src={PublicS3Url.concat(image)}
                alt={title}
                className="w-40 h-40 object-contain object-center"
              ></img>
            )}
            {/* <span className="bg-black w-[1px] h-32"></span> */}
            <div className="space-y-3">
              <p className="font-bold text-textBlack text-center md:text-lg">
                {title}
              </p>
              <p className="font-bold text-textBlack text-center md:text-lg">
                €&nbsp;{price}
              </p>
            </div>
          </div>
        )}
        {!image && (
          <p className="font-bold text-textBlack text-center md:text-lg">
            {title}
          </p>
        )}

        <p className="font-normal text-textColor text-center md:text-lg w-9/12">
          {description}
        </p>
        {link !== undefined ? (
          <Link to={link} className="w-1/2 mx-auto">
            <button type="button" className="gray_button capitalize w-full">
              {btnText}
            </button>
          </Link>
        ) : (
          <button type="button" className="gray_button capitalize w-1/2">
            {btnText}
          </button>
        )}
      </section>
    </div>
  );
};

export default Success;
