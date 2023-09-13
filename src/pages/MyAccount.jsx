import React, { useState } from "react";
import ActiveTabComponent from "../components/MyAccount/ActiveTabComponent";
import Profile from "../components/MyAccount/Profile";
import Orders from "../components/MyAccount/Orders";
import Download from "../components/MyAccount/Download";
import Address from "../components/MyAccount/Address";
import ChangePassword from "../components/MyAccount/ChangePassword";

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  return (
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
  );
};

export default MyAccount;
