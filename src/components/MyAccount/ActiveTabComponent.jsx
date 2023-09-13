import React from "react";

const ActiveTabComponent = ({ activeComponent, setActiveComponent }) => {
  return (
    <div className="border border-gray-300 md:space-y-3 space-y-2 xl:sticky top-0 xl:w-3/12 md:w-1/2 w-full">
      {/* title */}
      <p className="md:text-xl px-3 py-2">
        <b>My Account</b>
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
          Profile
        </li>
        <li
          className={`${
            activeComponent === "orders" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("orders")}
        >
          Orders
        </li>
        <li
          className={`${
            activeComponent === "downloads" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("downloads")}
        >
          Downloads
        </li>
        <li
          className={`${
            activeComponent === "addresses" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("addresses")}
        >
          Addresses
        </li>
        <li
          className={`${
            activeComponent === "change_password" &&
            "bg-darkBlue text-white font-semibold"
          } transition-all duration-[200ms] ease-in font-medium px-4 py-2`}
          onClick={() => setActiveComponent("change_password")}
        >
          Change Password
        </li>
      </ul>
      <hr />
      <p className="text-darkRed font-light text-left cursor-pointer py-2 px-4">
        Logout
      </p>
    </div>
  );
};

export default ActiveTabComponent;
