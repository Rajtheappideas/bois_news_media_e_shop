import React, { useEffect, useState } from "react";
import HeadNavigationLink from "../components/HeadNavigationLink";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeShowSignin } from "../redux/globalStates";
import { Link, useNavigate } from "react-router-dom";
import SingleProduct from "../components/Cart/SingleProduct";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleUpdateProductToCart,
} from "../redux/CartSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const [showAddressFields, setshowAddressFields] = useState(false);
  const [productsToUpdate, setProductsToUpdate] = useState([]);

  const { user } = useSelector((state) => state.root.auth);
  const { cart, subTotal, total } = useSelector((state) => state.root.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleUpdateProduct = () => {
    if (productsToUpdate.length === 0) return;
    dispatch(handleUpdateProductToCart(productsToUpdate));
    dispatch(handleCalculateSubTotal());
    dispatch(handleCalculateTotal());
    setProductsToUpdate([]);
  };

  useEffect(() => {
    if (user === null) {
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
    if (user !== null) {
      dispatch(handleCalculateSubTotal());
      dispatch(handleCalculateTotal());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Cart")} | E-shop</title>
      </Helmet>
      <div className="Container md:space-y-7 space-y-3 md:py-10 py-5 transition-all duration-100 ease-linear">
        {/* <HeadNavigationLink /> */}
        {cart !== undefined && cart.length > 0 ? (
          <>
            {/* cart box */}
            <div className="outline-none space-y-3 border ">
              <div className="border overflow-x-scroll scrollbar">
                <table className="outline-none w-full overflow-x-scroll">
                  <thead className="w-full border-b border-gray-300 text-center">
                    <tr>
                      <th className="md:p-4 p-2 text-center"></th>
                      <th className="md:p-4 p-2 lg:text-left text-center">
                        {t("Product")}
                      </th>
                      <th className="md:p-4 p-2 text-center">{t("Price")}</th>
                      <th className="md:p-4 p-2 text-center">
                        {t("Quantity")}
                      </th>
                      <th className="md:p-4 p-2 text-right">{t("Subtotal")}</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {cart.length > 0 &&
                      cart.map((product) => (
                        <SingleProduct
                          handleUpdateProduct={handleUpdateProduct}
                          key={product?._id}
                          product={product}
                          setProductsToUpdate={setProductsToUpdate}
                          productsToUpdate={productsToUpdate}
                        />
                      ))}
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
                  <button className="uppercase gray_button w-full md:min-h-[3rem]">
                    {t("Apply Promo code")}
                  </button>
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => handleUpdateProduct()}
                    className={`uppercase gray_button w-auto ${
                      productsToUpdate.length === 0 && "cursor-not-allowed"
                    } `}
                  >
                    {t("update cart")}
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
                  <p>{t("Sub total")}</p>
                  <p>{t("Shipping")}</p>
                </div>
                <div className="font-medium md:text-base text-sm text-right space-y-2">
                  <p>
                    € &nbsp;
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(parseFloat(subTotal))}
                  </p>
                  <div className="text-darkGray font-semibold space-y-3">
                    <p
                      className="inline-block w-auto cursor-pointer"
                      onClick={() => setshowAddressFields(!showAddressFields)}
                    >
                      {t("Select address")}
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
                      <button className="w-full gray_button">
                        {t("update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full flex items-center justify-between p-4">
                <p className="font-semibold md:text-base text-sm text-left">
                  {t("Total")}
                </p>
                <p className="font-medium md:text-base text-sm text-right text-black">
                  <b>
                    € &nbsp;
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(parseFloat(total))}
                  </b>
                  (including € 2.78 VAT)
                </p>
              </div>
            </div>
            {/* btn */}
            <div className="text-right">
              <Link to="/checkout">
                <button className="gray_button uppercase md:w-52">
                  {t("place order")}
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="loading my-10">{t("Your cart is empty")}.</div>
        )}
      </div>
    </>
  );
};

export default Cart;
