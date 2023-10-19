import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import success from "../assests/animations/error.json";

const Error = () => {
  const query = useLocation().search;
  console.log(query.split("?")[1].split("=")[1]);

  return (
    <div className="pb-5">
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
        <p className="font-bold text-textBlack text-center md:text-lg">
          Error Occured
        </p>
        <p className="font-normal text-textColor text-center md:text-lg w-9/12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id dolorem
          autem delectus eligendi, similique libero doloremque dolorum ipsa
          consequuntur, quisquam rerum pariatur quaerat ut non necessitatibus!
          Illo eos quisquam a!
        </p>
        <Link to="/" className="w-1/2 mx-auto">
          <button type="button" className="gray_button capitalize w-full">
            Go to home
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Error;
