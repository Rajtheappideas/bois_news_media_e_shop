import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //   const { user } = useSelector((state) => state.root.auth);
  const user = null;

  const { t } = useTranslation();

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      toast.error(t("Please sign-in first!!!"));
      navigate("/sign-in");
    }
  }, []);
  return <>{children}</>;
};

export default PrivateRoute;
