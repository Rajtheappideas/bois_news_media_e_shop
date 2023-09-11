import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowSignin,
  handleChangeShowSignup,
} from "../../redux/globalStates";

const Signup = () => {
  const dispatch = useDispatch();

  const { showSignup } = useSelector((state) => state.root.globalStates);

  const signupRef = useRef(null);

  useEffect(() => {
    if (showSignup) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (
        signupRef.current &&
        !signupRef.current.contains(event?.target) &&
        showSignup
      ) {
        dispatch(handleChangeShowSignup(false));
        window.document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showSignup]);

  function handleClickOutside() {
    dispatch(handleChangeShowSignup(false));
    window.document.body.style.overflow = "unset";
  }

  return (
    <div className="absolute z-10 inset-0 bg-black bg-opacity-50 overflow-y-scroll hide_scrollbar">
      <div
        ref={signupRef}
        className="absolute scrollbar z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-10 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            Create your account
          </p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              dispatch(handleChangeShowSignup(false));
            }}
          />
        </div>
        {/* name */}
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="fname" className="Label">
              First name
            </label>
            <input
              type="text"
              className="input_field"
              placeholder="first name"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lname" className="Label">
              Last name
            </label>
            <input
              type="text"
              className="input_field"
              placeholder="last name"
            />
          </div>
        </div>
        {/* email */}
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
        {/* phone */}
        <div>
          <label htmlFor="phone" className="Label">
            phone
          </label>
          <input
            type="number"
            className="input_field"
            placeholder="phone number"
          />
        </div>
        {/* civility */}
        <div>
          <label htmlFor="civility" className="Label">
            civility
          </label>
          <select name="civility" className="input_field">
            <option label="select"></option>
            <option value="">option1</option>
            <option value="">option2</option>
          </select>
        </div>
        {/* address */}
        <div>
          <label htmlFor="address" className="Label">
            address
          </label>
          <input type="number" className="input_field" placeholder="address" />
        </div>
        {/* country */}
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="fname" className="Label">
              country
            </label>
            <input type="text" className="input_field" placeholder="country" />
          </div>
          <div className="w-1/2">
            <label htmlFor="lname" className="Label">
              city
            </label>
            <input type="text" className="input_field" placeholder="city" />
          </div>
        </div>
        {/* postal code */}
        <div>
          <label htmlFor="postalCode" className="Label">
            postal code
          </label>
          <input
            type="number"
            className="input_field"
            placeholder="postal code"
          />
        </div>
        {/* password */}
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
        {/* btn */}
        <button type="button" className="gray_button w-full">
          register
        </button>
        {/* sign in link */}
        <p className="text-center">
          Already have an account?{" "}
          <span
            onClick={() => {
              dispatch(handleChangeShowSignin(true));
              dispatch(handleChangeShowSignup(false));
            }}
            className="text-darkBlue font-semibold cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
