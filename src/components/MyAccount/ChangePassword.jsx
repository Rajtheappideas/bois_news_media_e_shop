import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { handleChangePassword } from "../../redux/AuthSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);

  const { loading, token } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { AbortControllerRef } = useAbortApiCall();

  const changepasswordSchema = yup.object({
    oldPassword: yup.string().required(t("old password is required!!!")).trim(),
    newPassword: yup
      .string()
      .required(t("new password is required!!!"))
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        t(
          "Minimum 6 characters, at least one special character, at least one digit"
        )
      )
      .trim(),
    confirmPassword: yup
      .string()
      .required(t("confirm password is required!!!"))
      .oneOf([yup.ref("newPassword"), null], t("Password not match!!!")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(changepasswordSchema),
  });

  const onSubmit = (data) => {
    const { oldPassword, newPassword } = data;
    const response = dispatch(
      handleChangePassword({
        oldPassword,
        newPassword,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(t("Password change successfully."), { duration: 4000 });
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border border-gray-300 md:p-4 p-2 md:space-y-5 space-y-3"
    >
      <p className="heading">Change Password</p>
      {/* curr password */}
      <div className="space-y-2 relative">
        <label htmlFor="" className="Label">
          Currnet password
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="*******"
          className="w-full input_field"
          {...register("oldPassword")}
        />
        <button
          type="button"
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="absolute top-[2.4rem] cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={24} />
          ) : (
            <BsEyeSlashFill size={24} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.oldPassword?.message}
        </span>
      </div>
      {/* new password */}
      <div className="space-y-2 relative">
        <label htmlFor="" className="Label">
          New password
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="*******"
          className="w-full input_field"
          {...register("newPassword")}
        />
        <button
          type="button"
          onClick={() => setshowNewPassword(!showNewPassword)}
          className="absolute top-[2.4rem] cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={24} />
          ) : (
            <BsEyeSlashFill size={24} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.newPassword?.message}
        </span>
      </div>
      {/* confirm password */}
      <div className="space-y-2">
        <label htmlFor="" className="Label">
          confirm password
        </label>
        <input
          type="password"
          placeholder="*******"
          className="w-full input_field"
          {...register("confirmPassword")}
        />
        <span role="alert" className="error">
          {errors?.confirmPassword?.message}
        </span>
      </div>
      {/* btn */}
      <button disabled={loading} className="md:w-60 w-1/2 gray_button md:h-12">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ChangePassword;
