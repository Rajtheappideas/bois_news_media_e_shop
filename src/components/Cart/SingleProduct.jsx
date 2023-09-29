import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleRemoveProductFromCart,
} from "../../redux/CartSlice";
import toast from "react-hot-toast";

const SingleProduct = ({ product, productsToUpdate, setProductsToUpdate }) => {
  const [quantity, setQuantity] = useState(null);

  const dispatch = useDispatch();

  const handleOnchageQuantity = (e) => {
    toast.remove();
    if (e.target.value < 1) {
      setQuantity(product?.quantity);
      const removeFromProdcutsToUpdate = productsToUpdate.filter(
        (p) => p?._id !== product?._id
      );
      setProductsToUpdate(removeFromProdcutsToUpdate);
      return toast.error(
        "Quantity should not less than 1 and value should be valid"
      );
    } 
//     else if (!/^(?=.*[1-9])\d{1,3}(?:\.\d\d?)?$/.test(e.target.value)) {
//       setQuantity(product?.quantity);
//       const removeFromProdcutsToUpdate = productsToUpdate.filter(
//         (p) => p?._id !== product?._id
//       );
//       setProductsToUpdate(removeFromProdcutsToUpdate);
//       return toast.error(
//         "Quantity should not be more than 3 digits and quantity should valid value"
//       );
//     }
    const alreadyInArr = productsToUpdate.find((p) => p?._id === product?._id);
    if (alreadyInArr) {
      setProductsToUpdate(
        productsToUpdate.map((p) =>
          product?._id === p?._id ? { ...p, quantity: e.target.value } : p
        )
      );
    } else {
      setProductsToUpdate([
        ...productsToUpdate,
        { quantity: e.target.value, _id: product?._id },
      ]);
    }
    setQuantity(e.target.value);
  };

  const handleRemoveFromCart = () => {
    dispatch(handleRemoveProductFromCart(product?._id));
    dispatch(handleCalculateSubTotal());
    dispatch(handleCalculateTotal());
  };

  //   console.log(product);
  //   useEffect(() => {}, []);

  return (
    <tr className="border-b border-gray-300 w-full text-left select-none">
      <td className="pl-2">
        <AiOutlineClose
          size={20}
          color="red"
          role="button"
          className="mx-auto"
          onClick={() => handleRemoveFromCart()}
        />
      </td>
      <td className="text-left p-4 flex lg:flex-row flex-col items-center justify-start lg:gap-4 gap-2">
        <img
          src={require("../../assests/images/Product image-3.png")}
          alt={product?.title}
          className="w-fit md:h-48 h-40 object-contain object-center"
        />
        <div className="space-y-2 lg:whitespace-normal whitespace-nowrap lg:text-left text-center">
          <p className="md:text-base text-sm font-semibold">{product?.title}</p>
          <p className="space-x-2">
            <span>
              <b>Type of support :</b>
            </span>
            <span>{product?.selectedTypeOfSupport}</span>
          </p>
          <p className="space-x-2">
            <span>
              <b>Shipping area :</b>
            </span>
            <span>{product?.selectedShippingZone}</span>
          </p>
        </div>
      </td>
      <td className="text-center p-4 whitespace-nowrap font-semibold">
        € &nbsp;
        {Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(product?.price)}
      </td>
      {/* input field */}
      <td className="text-center p-4">
        <input
          type="number"
          placeholder="1"
          className="outline-none w-20 p-1 border border-darkGray"
          min={1}
          value={quantity === null ? product?.quantity : quantity}
          onChange={(e) => handleOnchageQuantity(e)}
        />
      </td>
      {/* {product?.magazineId ? (
        <td className="text-center p-4">
          <input
            type="number"
            placeholder="1"
            className="outline-none w-20 p-1 border border-darkGray"
            min={1}
            value={quantity === null ? product?.quantity : quantity}
            onChange={(e) => handleOnchageQuantity(e)}
          />
        </td>
      ) : (
        <td className="p-4 text-center text-3xl">-</td>
      )} */}
      <td className="p-4 whitespace-nowrap text-right font-semibold">
        €&nbsp;
        {Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
        }).format(parseFloat(product?.price) * parseFloat(product?.quantity))}
      </td>
    </tr>
  );
};

export default SingleProduct;
