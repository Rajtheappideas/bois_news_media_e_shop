import React from "react";
import { useTranslation } from "react-i18next";

const ActiveTabComponent = ({ activeComponent, setActiveComponent }) => {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-300 md:space-y-3 space-y-2 xl:sticky top-36  z-0 xl:w-3/12 md:w-1/2 w-full">
      {/* title */}
      <p className="md:text-xl px-3 py-2">
        <b>{t("My Account")}</b>
      </p>
      <hr />
      <ul className="cursor-pointer">
        <li
          className={`${
            activeComponent === "profile" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("profile")}
        >
          {t("Profile")}
        </li>
        <li
          className={`${
            activeComponent === "orders" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("orders")}
        >
          {t("Orders")}
        </li>
        <li
          className={`${
            activeComponent === "downloads" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("downloads")}
        >
          {t("Downloads")}
        </li>
        <li
          className={`${
            activeComponent === "addresses" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("addresses")}
        >
          {t("Addresses")}
        </li>
        <li
          className={`${
            activeComponent === "change_password" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("change_password")}
        >
          {t("Change Password")}
        </li>
      </ul>
      <hr />
      <p className="text-darkRed inline-block font-light text-left cursor-pointer py-2 px-4">
        {t("logout")}
      </p>
    </div>
  );
};

export default ActiveTabComponent;
