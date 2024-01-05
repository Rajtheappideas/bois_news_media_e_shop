import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCalculateSubTotal,
  handleCalculateTotal,
  handleRemoveFromCart,
  handleRemoveProductFromCart,
} from "../../redux/CartSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PublicS3Url } from "../../BaseUrl";
import useAbortApiCall from "../../hooks/useAbortApiCall";

const SingleProduct = ({ product, productsToUpdate, setProductsToUpdate }) => {
  const [quantity, setQuantity] = useState(null);

  const { token } = useSelector((s) => s.root.auth);
  const { cart } = useSelector((s) => s.root.cart);

  const dispatch = useDispatch();

  const { AbortControllerRef } = useAbortApiCall();

  const { t } = useTranslation();

  const handleOnchageQuantity = (e) => {
    toast.remove();
    if (e.target.value < 1) {
      setQuantity(product?.quantity);
      const removeFromProdcutsToUpdate = productsToUpdate.filter(
        (p) => p?._id !== product?._id
      );
      setProductsToUpdate(removeFromProdcutsToUpdate);
      return toast.error(
        t("quantity should not less than 1 and value should be valid")
      );
    }

    const alreadyInArr = productsToUpdate.find(
      (p) => p?.itemId === product?.itemId?._id
    );
    if (alreadyInArr) {
      setProductsToUpdate(
        productsToUpdate.map((p) =>
          product?.itemId?._id === p?.itemId
            ? { ...p, quantity: parseFloat(e.target.value) }
            : p
        )
      );
    } else {
      setProductsToUpdate([
        ...productsToUpdate,
        { quantity: parseFloat(e.target.value), itemId: product?.itemId?._id },
      ]);
    }
    setQuantity(e.target.value.replace(/\b0+/g, ""));
  };

  const handleRemoveFromCartFunction = () => {
    const response = dispatch(
      handleRemoveFromCart({
        token,
        id: product?.itemId?._id,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.status === "success") {
          toast.success(`${product?.itemId?.title} removed succesfully`);
          dispatch(handleRemoveProductFromCart(product?._id));
          dispatch(handleCalculateSubTotal());
          dispatch(handleCalculateTotal());
        }
      });
    }
  };

  return (
    <tr className="last:border-0 border-b border-gray-300 w-full text-left select-none">
      <td className="pl-2">
        <AiOutlineClose
          size={20}
          color="red"
          role="button"
          className="mx-auto"
          onClick={() => handleRemoveFromCartFunction()}
        />
      </td>
      <td className="text-left p-4 flex lg:flex-row flex-col items-center justify-start lg:gap-4 gap-2">
        <img
          src={PublicS3Url.concat(product?.itemId?.image)}
          alt={product?.title}
          className="w-fit md:h-48 h-40 object-contain object-center"
        />
        <div className="space-y-2 lg:whitespace-normal whitespace-nowrap lg:text-left text-center">
          <p className="md:text-base text-sm font-semibold">
            {product?.itemId?.title}
          </p>
          <p className="space-x-2">
            <span>
              <b>{t("Type of support")} :</b>
            </span>
            <span>{product?.support}</span>
          </p>
        </div>
      </td>
      <td className="text-center p-4 whitespace-nowrap font-semibold">
        € &nbsp;
        {product?.support == "paper"
          ? Intl.NumberFormat("fr-FR", {
            maximumFractionDigits: 1,
          }).format(product?.itemId?.pricePaper)
          : Intl.NumberFormat("fr-FR", {
            maximumFractionDigits: 1,
          }).format(product?.itemId?.priceDigital)}
      </td>
      {/* input field */}

      {product?.itemType === "Magazine" && product?.support === "paper" ? (
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
      )}
      <td className="p-4 whitespace-nowrap text-right font-semibold">
        €&nbsp;
        {product?.support == "paper"
          ? Intl.NumberFormat("fr-FR", {
            maximumFractionDigits: 1,
          }).format(
            parseFloat(product?.itemId?.pricePaper) *
            parseFloat(product?.quantity)
          )
          : Intl.NumberFormat("fr-FR", {
            maximumFractionDigits: 1,
          }).format(
            parseFloat(product?.itemId?.priceDigital) *
            parseFloat(product?.quantity)
          )}
      </td>
    </tr>
  );
};

export default SingleProduct;
