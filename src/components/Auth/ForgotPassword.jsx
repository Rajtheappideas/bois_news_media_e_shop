import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeShowForgotPassword } from "../../redux/globalStates";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { showForgotPassword } = useSelector(
    (state) => state.root.globalStates
  );

  const forgotRef = useRef(null);

  useEffect(() => {
    if (showForgotPassword) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (
        forgotRef.current &&
        !forgotRef.current.contains(event?.target) &&
        showForgotPassword
      ) {
        dispatch(handleChangeShowForgotPassword(false));
        window.document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showForgotPassword]);

  function handleClickOutside() {
    dispatch(handleChangeShowForgotPassword(false));
    window.document.body.style.overflow = "unset";
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50">
      <div
        ref={forgotRef}
        className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">Forgot Password</p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              dispatch(handleChangeShowForgotPassword(false));
            }}
          />
        </div>
        <p className="text-gray-400 text-sm">
          Please enter your username or email address. You will receive a link
          by email to create a new password.
        </p>
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
        {/* <div>
          <label htmlFor="password" className="Label">
            Password
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="Label">
            Confirm Password
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
          />
        </div> */}
        <button type="button" className="gray_button w-full">
          submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
