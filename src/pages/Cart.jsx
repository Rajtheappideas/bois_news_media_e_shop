import React, { useEffect, useState } from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import { AiOutlineClose } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeShowSignin } from "../redux/globalStates";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [showAddressFields, setshowAddressFields] = useState(false);

  const { user } = useSelector((state) => state.root.auth);
  const { cart } = useSelector((state) => state.root.cart);
  console.log(cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
  }, []);

  return (
    <>
      <Helmet title="Cart | E-shop" />
      <div className="Container md:space-y-7 space-y-3 md:py-10 py-5 transition-all duration-100 ease-linear">
        {/* <HeadNavigationLink /> */}
        {/* cart box */}
        <div className="outline-none space-y-3 border ">
          <div className="border overflow-x-scroll scrollbar">
            <table className="outline-none w-full overflow-x-scroll">
              <thead className="w-full border-b border-gray-300 text-center">
                <tr>
                  <th className="md:p-4 p-2 text-center"></th>
                  <th className="md:p-4 p-2 lg:text-left text-center">
                    Product
                  </th>
                  <th className="md:p-4 p-2 text-center">Price</th>
                  <th className="md:p-4 p-2 text-center">Quantity</th>
                  <th className="md:p-4 p-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="border-b border-gray-300 w-full text-left select-none">
                  <td className="pl-2">
                    <AiOutlineClose
                      size={20}
                      color="red"
                      role="button"
                      className="mx-auto"
                    />
                  </td>
                  <td className="text-left p-4 flex lg:flex-row flex-col items-center justify-start lg:gap-4 gap-2">
                    <img
                      src={require("../assests/images/Product image-3.png")}
                      alt="magazine"
                      className="w-fit md:h-48 h-40 object-contain object-center"
                    />
                    <div className="space-y-2 lg:whitespace-normal whitespace-nowrap lg:text-left text-center">
                      <p className="md:text-base text-sm font-semibold">
                        BOISmag subscription
                      </p>
                      <p className="space-x-2">
                        <span>
                          <b>Type of support :</b>
                        </span>
                        <span>Digital (PDF)</span>
                      </p>
                      <p className="space-x-2">
                        <span>
                          <b>Shipping area :</b>
                        </span>
                        <span>Metropolitan France</span>
                      </p>
                    </div>
                  </td>
                  <td className="text-center p-4 whitespace-nowrap font-semibold">
                    € 115.00
                  </td>

                  <td className="text-center p-4">
                    <input
                      type="number"
                      placeholder="1"
                      className="outline-none w-20 p-1 border border-darkGray"
                      min={0}
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap text-right font-semibold">
                    € 115.00
                  </td>
                </tr>
                <tr className="w-full text-left select-none">
                  <td className="pl-2">
                    <AiOutlineClose
                      size={20}
                      color="red"
                      role="button"
                      className="mx-auto"
                    />
                  </td>
                  <td className="text-left p-4 flex lg:flex-row flex-col items-center justify-start lg:gap-4 gap-2">
                    <img
                      src={require("../assests/images/Product image-3.png")}
                      alt="magazine"
                      className="w-fit md:h-48 h-40 object-contain object-center"
                    />
                    <div className="space-y-2 lg:whitespace-normal whitespace-nowrap lg:text-left text-center">
                      <p className="md:text-base text-sm font-semibold">
                        BOISmag subscription
                      </p>
                      <p className="space-x-2">
                        <span>
                          <b>Type of support :</b>
                        </span>
                        <span>Digital (PDF)</span>
                      </p>
                      <p className="space-x-2">
                        <span>
                          <b>Shipping area :</b>
                        </span>
                        <span>Metropolitan France</span>
                      </p>
                    </div>
                  </td>
                  <td className="text-center p-4 whitespace-nowrap font-semibold">
                    € 115.00
                  </td>

                  <td className="text-center p-4">
                    <input
                      type="number"
                      placeholder="1"
                      className="outline-none w-20 p-1 border border-darkGray"
                      min={0}
                    />
                  </td>
                  <td className="p-4 whitespace-nowrap text-right font-semibold">
                    € 115.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full flex md:flex-row flex-col items-center justify-between md:gap-2 gap-5 lg:px-4 px-2 py-3">
            <div className="flex items-center md:flex-nowrap flex-wrap gap-2">
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 input_field"
                placeholder="Promo Code"
              />
              <button className="uppercase gray_button w-full md:h-11">
                Apply Promo code
              </button>
            </div>
            <div className="w-full md:w-auto">
              <button className="uppercase gray_button md:w-40 w-full">
                update cart
              </button>
            </div>
          </div>
        </div>
        {/* total box */}
        <div className="w-full border transition-all duration-100 ease-linear">
          {/* sub total */}
          <div className="w-full flex items-start justify-between p-4">
            {/* sub total + shipping */}
            <div className="font-semibold md:text-base text-sm text-left space-y-2">
              <p>Sub total</p>
              <p>Shipping</p>
            </div>
            <div className="font-medium md:text-base text-sm text-right space-y-2">
              <p>€ 135.00</p>
              <div className="text-darkGray font-semibold space-y-3">
                <p
                  className="inline-block w-auto cursor-pointer"
                  onClick={() => setshowAddressFields(!showAddressFields)}
                >
                  Select address
                </p>
                {/* address */}
                {/* <div className="space-y-2 text-black">
                <p>
                  <b>Free</b>
                </p>
                <p>Delivery to 99990, Finland.</p>
                <p className="text-darkGray">Change address</p>
              </div> */}
                {/* address fields */}
                <div
                  className={`${
                    showAddressFields ? "scale-100 h-full" : "scale-0 h-0"
                  } transition-all duration-300 origin-top flex flex-col gap-2 md:w-60 w-auto`}
                >
                  <select name="country" className="input_field w-full">
                    <option label="Country"></option>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                  </select>
                  <select name="state" className="input_field w-full">
                    <option label="State"></option>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                    <option value="option3">option3</option>
                  </select>
                  <input
                    type="text"
                    placeholder="City"
                    className="input_field w-full"
                  />
                  <input
                    type="number"
                    placeholder="Postal code"
                    className="input_field w-full"
                  />
                  <button className="w-full gray_button">update</button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full flex items-center justify-between p-4">
            <p className="font-semibold md:text-base text-sm text-left">
              Total
            </p>
            <p className="font-medium md:text-base text-sm text-right text-black">
              <b>€ 135.00</b>
              (including € 2.78 VAT)
            </p>
          </div>
        </div>
        {/* btn */}
        <div className="text-right">
          <button className="gray_button uppercase md:w-52">place order</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
