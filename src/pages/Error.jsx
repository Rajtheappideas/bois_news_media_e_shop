import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import success from "../assests/animations/error.json";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Error = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = useLocation().search;
  const token = query?.split("?")[1]?.split("=")[1];
  const navigate = useNavigate();

  const handleVerifyToken = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios("/api/verify-token", {
        method: "post",
        data: {
          token,
        },
      });
      setMessage(data?.message);
      setLoading(false);
    } catch (error) {
      navigate("/");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    handleVerifyToken();
  }, []);

  return (
    <div className="pb-5">
      {token && loading ? (
        <div className="loading py-14">Verifying....</div>
      ) : (
        <>
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
              {message}
            </p>
            <Link to="/" className="w-1/2 mx-auto">
              <button type="button" className="gray_button capitalize w-full">
                Go to home
              </button>
            </Link>
          </section>
        </>
      )}
    </div>
  );
};

export default Error;
