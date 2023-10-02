import React, { useEffect, useState } from "react";
import ActiveTabComponent from "../components/MyAccount/ActiveTabComponent";
import Profile from "../components/MyAccount/Profile";
import Orders from "../components/MyAccount/Orders";
import Download from "../components/MyAccount/Download";
import Address from "../components/MyAccount/Address";
import ChangePassword from "../components/MyAccount/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChangeShowSignin } from "../redux/globalStates";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { handleGetUserAddress } from "../redux/AuthSlice";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  const { user, token } = useSelector((state) => state.root.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { abortApiCall, AbortControllerRef } = useAbortApiCall();

  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
    if (user !== null) {
      dispatch(handleGetUserAddress({ token, signal: AbortControllerRef }));
    }
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("My-account")} | E-shop</title>
      </Helmet>
      <div className="Container md:py-10 py-5">
        <div className="w-full flex xl:flex-row flex-col items-start xl:gap-6 gap-3">
          <ActiveTabComponent
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
          <div className="xl:w-9/12 w-full">
            {activeComponent === "profile" && <Profile />}
            {activeComponent === "orders" && <Orders />}
            {activeComponent === "downloads" && <Download />}
            {activeComponent === "addresses" && <Address />}
            {activeComponent === "change_password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
