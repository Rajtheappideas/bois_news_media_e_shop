import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeShowForgotPassword,
  handleChangeShowSignin,
  handleChangeShowSignup,
  handleSuccess,
} from "../../redux/globalStates";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { handleLoginUser } from "../../redux/AuthSlice";
import toast from "react-hot-toast";

const Signin = () => {
  const [showPassword, setshowPassword] = useState(false);

  const { showSignin } = useSelector((state) => state.root.globalStates);
  const { loading } = useSelector((state) => state.root.auth);

  const { t } = useTranslation();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const dispatch = useDispatch();
  const signinRef = useRef(null);

  const signinSchema = yup.object({
    email: yup.string().email().required(t("email is required")).trim(),
    password: yup.string().required(t("password is required")).trim(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    const response = dispatch(
      handleLoginUser({
        email,
        password,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("sign in successfully"));
          dispatch(handleSuccess());
          dispatch(handleChangeShowSignin(false));
        }
      });
    }
  };

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

  useEffect(() => {
    return () => {
      abortApiCall();
      window.document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={signinRef}
        className="fixed z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">
            {t("Login to your account")}
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
            {t("E-mail")}
          </label>
          <input
            type="email"
            className="input_field"
            placeholder="hello@gmail.com"
            {...register("email")}
          />
          <span className="error">{errors?.email?.message}</span>
        </div>
        <div className="relative h-24">
          <label htmlFor="password" className="Label">
            {t("Password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="input_field"
            placeholder="********"
          />
          <button type="button" onClick={() => setshowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeFill
                size={24}
                className="absolute md:top-[60%] top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            ) : (
              <BsEyeSlashFill
                size={24}
                className="absolute md:top-[60%] top-1/2 -translate-y-1/2 cursor-pointer right-3 text-gray-400"
              />
            )}
          </button>
          <span className="error">{errors?.password?.message}</span>
        </div>
        <button disabled={loading} type="submit" className="gray_button w-full">
          {loading ? t("loading").concat("...") : t("login")}
        </button>
        <p className="text-center font-medium ">
          <span
            className="cursor-pointer"
            onClick={() => {
              dispatch(handleChangeShowForgotPassword(true));
              dispatch(handleChangeShowSignin(false));
            }}
          >
            {t("Forgot password")}?
          </span>
        </p>
        <p className="text-center">
          {t("Don't have an account")}?{" "}
          <span
            onClick={() => {
              dispatch(handleChangeShowSignup(true));
              dispatch(handleChangeShowSignin(false));
            }}
            className="text-darkBlue font-semibold cursor-pointer"
          >
            {t("Register Now")}!
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
