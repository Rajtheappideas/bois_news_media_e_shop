import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeSearchMagazines,
  handleChangeShowSearch,
} from "../redux/globalStates";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchPopup = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { showSearchModal } = useSelector((s) => s.root.globalStates);
  const { allMagazinesAndSubscriptions } = useSelector((s) => s.root.shop);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const modalRef = useRef(null);

  const handleSearchMagazines = (e) => {
    e.preventDefault();
    toast.remove();
    if (!searchTerm) return toast.error(t("Enter a word"));
    const filteredProducts = allMagazinesAndSubscriptions.filter((entry) =>
      Object.values(entry).some((val) => {
        if (typeof val === "string") {
          return val.toLocaleLowerCase().includes(searchTerm);
        }
      })
    );
    toast.remove();
    if (!filteredProducts.length > 0)
      return toast.error(t("Magazine not found"));
    toast.loading("Searching...");
    setTimeout(() => {
      toast.remove();
      dispatch(handleChangeSearchMagazines(filteredProducts));
      handleClickOutside();
      navigate("/search", { state: { searchTerm } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  useEffect(() => {
    if (showSearchModal) {
      window.document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event?.target) &&
        showSearchModal
      ) {
        dispatch(handleChangeShowSearch(false));
        window.document.body.style.overflow = "unset";
        setSearchTerm("");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside, showSearchModal]);

  function handleClickOutside() {
    dispatch(handleChangeShowSearch(false));
    window.document.body.style.overflow = "unset";
    setSearchTerm("");
  }

  useEffect(() => {
    return () => {
      window.document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div
        className={`fixed z-10 ${
          showSearchModal ? "scale-100" : "scale-0"
        } transition-all duration-300 origin-center inset-0 bg-black bg-opacity-30`}
      ></div>
      <form
        onSubmit={handleSearchMagazines}
        ref={modalRef}
        className={`bg-white xl:w-1/2 md:w-2/3 w-11/12 flex md:flex-row flex-col items-center gap-2 z-10 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:p-4 p-2 rounded-lg transition-all duration-300 origin-center ${
          showSearchModal ? "scale-100" : "scale-0"
        } `}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full input_field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="blue_button md:h-12 h-10 md:w-40 w-full">
          {t("Search")}
        </button>
      </form>
    </>
  );
};

export default SearchPopup;
