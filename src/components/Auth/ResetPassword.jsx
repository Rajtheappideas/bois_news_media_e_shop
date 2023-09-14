import React, { useEffect, useRef, useState } from "react";
import { handleChangeShowResetPassword } from "../../redux/globalStates";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { handleResetPassword } from "../../redux/AuthSlice";
import { AiOutlineClose } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { showResetPassword } = useSelector((state) => state.root.globalStates);

  const resetRef = useRef(null);

  const { t } = useTranslation();

  const resetSchema = yup.object({
    password: yup
      .string()
      .required(t("Password is required"))
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        t(
          "Minimum 8 characters, at least one special character, at least one digit"
        )
      )
      .trim(),
    confirmPassword: yup
      .string()
      .required(t("Confirm password is required!!!"))
      .oneOf([yup.ref("password"), null], t("Password not match!!!")),
  });
  const { loading, user, email, verifyToken } = useSelector(
    (state) => state.root.auth
  );

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(resetSchema),
  });

  const onSubmit = (data) => {
    const { password } = data;

    const response = dispatch(
      handleResetPassword({
        email,
        password,
        verifyToken,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("Password Reset successfully."));
          dispatch(handleChangeShowResetPassword(false));
          // window.localStorage.clear()
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      abortApiCall();
    };
  }, []);

  useEffect(() => {
    if (showResetPassword) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (
        resetRef.current &&
        !resetRef.current.contains(event?.target) &&
        showResetPassword
      ) {
        dispatch(handleChangeShowResetPassword(false));
        window.document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showResetPassword]);

  function handleClickOutside() {
    dispatch(handleChangeShowResetPassword(false));
    window.document.body.style.overflow = "unset";
  }

  return (
    <div className="absolute z-10 inset-0 bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={resetRef}
        className="absolute z-10 xl:w-1/3 md:w-1/2 w-11/12 h-auto md:p-5 p-2 rounded-lg bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 space-y-3"
      >
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-left md:text-lg">Reset Password</p>
          <AiOutlineClose
            size={20}
            role="button"
            onClick={() => {
              dispatch(handleChangeShowResetPassword(false));
            }}
          />
        </div>

        <div className="relative h-20">
          <label htmlFor="password" className="Label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="input_field"
            placeholder="********"
            {...register("password")}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
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
        </div>
        <span className="error">{errors?.password?.message}</span>
        <div>
          <label htmlFor="confirmPassword" className="Label">
            Confirm Password
          </label>
          <input
            type="password"
            className="input_field"
            placeholder="********"
            {...register("confirmPassword")}
          />
          <span className="error">{errors?.confirmPassword?.message}</span>
        </div>
        <button disabled={loading} type="submit" className="gray_button w-full">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
