import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const [showEditProfile, setshowEditProfile] = useState(false);

  const { user, loading } = useSelector((state) => state.root.auth);

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {showEditProfile ? (
            <EditProfile setshowEditProfile={setshowEditProfile} />
          ) : (
            <div className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border border-gray-300">
              <p className="heading text-lg md:text-left text-center">
                Profile
              </p>
              {/* name */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Name: </div>
                <div className="flex-1">
                  {user?.fname ?? "-"} {user?.lname}
                </div>
              </div>
              {/* emaail */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Email:</div>
                <div className="flex-1">{user?.email ?? "-"}</div>
              </div>
              {/* phone */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Phone: </div>
                <div className="flex-1">{user?.phone}</div>
              </div>
              {/* civility */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Civlity: </div>
                <div className="flex-1">{user?.civility ?? "-"}</div>
              </div>
              {/* address */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Address: </div>
                <div className="flex-1">
                  {user?.shippingAddress?.address1 ?? "-"}
                </div>
              </div>
              {/* province */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Province: </div>
                <div className="flex-1">
                  {user?.shippingAddress?.province ?? "-"}
                </div>
              </div>
              {/* country */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Country: </div>
                <div className="flex-1">
                  {user?.shippingAddress?.country ?? "-"}
                </div>
              </div>
              {/* city */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">City: </div>
                <div className="flex-1">
                  {user?.shippingAddress?.city ?? "-"}
                </div>
              </div>
              {/* postal code */}
              <div className="flex items-center gap-3">
                <div className="md:w-40 w-20 font-semibold">Postal code:</div>
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
                  Edit Profile
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
