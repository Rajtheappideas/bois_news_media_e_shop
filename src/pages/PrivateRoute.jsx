import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChangeShowSignin } from "../redux/globalStates";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.root.auth);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      toast.error(t("Please sign-in first!!!"));
      dispatch(handleChangeShowSignin(true));
      navigate("/");
    }
  }, []);

  
  return <>{children}</>;
};

export default PrivateRoute;
