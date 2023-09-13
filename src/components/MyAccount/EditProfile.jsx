import React from "react";

const EditProfile = ({ setshowEditProfile }) => {
  return (
    <div className="md:space-y-3 space-y-2 md:p-5 p-2 w-full border border-gray-300">
      <p className="heading text-lg md:text-left text-center">Edit Profile</p>
      {/* name */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="first_name" className="Label">
            First name
          </label>
          <input
            type="text"
            placeholder="john"
            className="w-full input_field"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="last_name" className="Label">
            Last name
          </label>
          <input
            type="text"
            placeholder="adam"
            className="w-full input_field"
          />
        </div>
      </div>
      {/* email */}
      <div className="w-full">
        <label htmlFor="email" className="Label">
          email
        </label>
        <input
          type="email"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* phone */}
      <div className="w-full">
        <label htmlFor="phone" className="Label">
          phone
        </label>
        <input
          type="number"
          placeholder="37366873635"
          className="w-full input_field"
        />
      </div>
      {/* civility */}
      <div className="w-full">
        <label htmlFor="civility" className="Label">
          Civility
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* address */}
      <div className="w-full">
        <label htmlFor="street_address" className="Label">
          address
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* coutry + city */}
      <div className="w-full flex md:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="md:w-1/2 w-full">
          <label htmlFor="country" className="Label">
            country
          </label>
          <input
            type="text"
            placeholder="country"
            className="w-full input_field"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <label htmlFor="city" className="Label">
            city
          </label>
          <input
            type="text"
            placeholder="city"
            className="w-full input_field"
          />
        </div>
      </div>
      {/* postal code */}
      <div className="w-full">
        <label htmlFor="postal_code" className="Label">
          postal code
        </label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full input_field"
        />
      </div>
      {/* btn */}
      <div className="flex items-center gap-3">
        <button className="gray_button md:h-12 md:w-40 w-1/2">Save</button>
        <button
          onClick={() => setshowEditProfile(false)}
          className="light_gray_button md:h-12 md:w-40 w-1/2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
