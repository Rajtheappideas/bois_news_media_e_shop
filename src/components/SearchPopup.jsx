import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeShowSearch } from "../redux/globalStates";

const SearchPopup = () => {
  const { showSearchModal } = useSelector((s) => s.root.globalStates);

  const dispatch = useDispatch();

  const modalRef = useRef(null);

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
      <div
        ref={modalRef}
        className={`bg-white w-1/2 flex items-center gap-2 z-10 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 rounded-lg transition-all duration-300 origin-center ${
          showSearchModal ? "scale-100" : "scale-0"
        } `}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full input_field"
        />
        <button className="blue_button h-12 w-40">Search</button>
      </div>
    </>
  );
};

export default SearchPopup;
