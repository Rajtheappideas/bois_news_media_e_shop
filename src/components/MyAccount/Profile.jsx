import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [showEditProfile, setshowEditProfile] = useState(false);

  const { t } = useTranslation();

  const { user, loading } = useSelector((state) => state.root.auth);

  return (
    <>
      {loading ? (
        <div className="loading">{t("Loading").concat("...")}</div>
      ) : (
        <>
          {showEditProfile ? (
            <EditProfile setshowEditProfile={setshowEditProfile} />
          ) : (
            <div className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border border-gray-300">
              <p className="heading text-lg md:text-left text-center">
                {t("Profile")}
              </p>
              {/* name */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("Name")}:{" "}
                </div>
                <div className="flex-1">
                  {user?.fname ?? "-"} {user?.lname}
                </div>
              </div>
              {/* sub id */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("Subscriber ID")}:{" "}
                </div>
                <div className="flex-1">{user?.subscriberId}</div>
              </div>
              {/* emaail */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("Email")}:
                </div>
                <div className="flex-1">{user?.email ?? "-"}</div>
              </div>
              {/* phone */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("phone")}:{" "}
                </div>
                <div className="flex-1">{user?.phone}</div>
              </div>
              {/* mobile */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("mobile")}:{" "}
                </div>
                <div className="flex-1">{user?.mobile ?? "-"}</div>
              </div>
              {/* civility */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {"civlity"}:{" "}
                </div>
                <div className="flex-1">{user?.civility ?? "-"}</div>
              </div>
              {/* address */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("address")}:{" "}
                </div>
                <div className="flex-1">
                  {user?.shippingAddress?.address1 ?? "-"}
                </div>
              </div>
              {/* province */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("province")}:{" "}
                </div>
                <div className="flex-1">
                  {user?.shippingAddress?.province === "" || undefined
                    ? "-"
                    : user?.shippingAddress?.province}
                </div>
              </div>
              {/* country */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("country")}:{" "}
                </div>
                <div className="flex-1">
                  {user?.shippingAddress?.country ?? "-"}
                </div>
              </div>
              {/* city */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {"city"}:{" "}
                </div>
                <div className="flex-1">
                  {user?.shippingAddress?.city ?? "-"}
                </div>
              </div>
              {/* postal code */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold capitalize">
                  {t("postal code")}:
                </div>
                <div className="flex-1">
                  {user?.shippingAddress?.zipCode ?? "-"}
                </div>
              </div>
              {/* btn */}
              <div className="md:text-left text-center">
                <button
                  onClick={() => setshowEditProfile(true)}
                  className="gray_button font-semibold md:h-12 md:w-40"
                >
                  {t("Edit Profile")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
