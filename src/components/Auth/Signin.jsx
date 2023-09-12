import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowForgotPassword,
  handleChangeShowSignin,
  handleChangeShowSignup,
} from "../../redux/globalStates";

const Signin = () => {
  const dispatch = useDispatch();

  const { showSignin } = useSelector((state) => state.root.globalStates);

  const signinRef = useRef(null);

  useEffect(() => {
    if (showSignin) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (
        signinRef.current &&
        !signinRef.current.contains(event?.target) &&
        showSignin
      ) {
        dispatch(handleChangeShowSignin(false));
        window.document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showSignin]);

  function handleClickOutside() {
    dispatch(handleChangeShowSignin(false));
    window.document.body.style.overflow = "unset";
  }

  return (
    <div className="absolute z-10 inset-0 bg-black bg-opacity-50">
      <div
        ref={signinRef}
        className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            Login to your account
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              dispatch(handleChangeShowSignin(false));
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="Label">
            E-mail
          </label>
          <input
            type="email"
            className="input_field"
            placeholder="hello@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="Label">
            Password
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
          />
        </div>
        <button type="button" className="gray_button w-full">
          login
        </button>
        <p
          onClick={() => {
            dispatch(handleChangeShowForgotPassword(true));
            dispatch(handleChangeShowSignin(false));
          }}
          className="text-center font-medium cursor-pointer"
        >
          Forgot password?
        </p>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            onClick={() => {
              dispatch(handleChangeShowSignup(true));
              dispatch(handleChangeShowSignin(false));
            }}
            className="text-darkBlue font-semibold cursor-pointer"
          >
            Register Now!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
