import React from "react";

const ChangePassword = () => {
  return (
    <div className="w-full border border-gray-300 md:p-4 p-2 md:space-y-5 space-y-3">
      <p className="heading">Change Password</p>
      {/* curr password */}
      <div className="space-y-2">
        <label htmlFor="" className="Label">
          Currnet password
        </label>
        <input
          type="password"
          placeholder="*******"
          className="w-full input_field"
        />
      </div>
      {/* new password */}
      <div className="space-y-2">
        <label htmlFor="" className="Label">
          New password
        </label>
        <input
          type="password"
          placeholder="*******"
          className="w-full input_field"
        />
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
        />
      </div>
      {/* btn */}
      <button className="md:w-60 w-1/2 gray_button md:h-12">Save</button>
    </div>
  );
};

export default ChangePassword;
