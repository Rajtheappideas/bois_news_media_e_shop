import React, { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [showEditProfile, setshowEditProfile] = useState(false);

  return (
    <>
      {showEditProfile ? (
        <EditProfile setshowEditProfile={setshowEditProfile} />
      ) : (
        <div className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border border-gray-300">
          <p className="heading text-lg md:text-left text-center">Profile</p>
          {/* name */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Name: </div>
            <div className="flex-1">John Adam</div>
          </div>
          {/* emaail */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Email:</div>
            <div className="flex-1">johnadam68@mail.com</div>
          </div>
          {/* phone */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Phone: </div>
            <div className="flex-1">+1 313-940-6412</div>
          </div>
          {/* civility */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Civlity: </div>
            <div className="flex-1">Practicing</div>
          </div>
          {/* address */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Address: </div>
            <div className="flex-1">4127 State Street, Michigan</div>
          </div>
          {/* country */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Country: </div>
            <div className="flex-1">United States</div>
          </div>
          {/* city */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">City: </div>
            <div className="flex-1">Southfield</div>
          </div>
          {/* postal code */}
          <div className="flex items-center gap-3">
            <div className="md:w-40 w-20 font-semibold">Postal cob</div>
            <div className="flex-1">727476</div>
          </div>
          {/* btn */}
          <div className="md:text-left text-center">
            <button onClick={()=>setshowEditProfile(true)} className="gray_button font-semibold md:h-12 md:w-40">
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
