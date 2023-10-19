import React from "react";
import Success from "../components/Success";
import { useLocation, useParams } from "react-router-dom";
import BaseUrl from "../BaseUrl";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SuccessPage = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = useLocation().search;
  const token = query.split("?")[1].split("=")[1];

  const handleVerifyToken = async () => {
    if (token) {
      setLoading(true);
      try {
        const { data } = await axios("/api/verify-token", {
          method: "post",
          data: {
            token,
          },
        });
        setMessage(data?.message);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <div className="pb-5">
      {loading ? (
        <div className="loading py-14">Verifying....</div>
      ) : (
        <Success
          title={message ?? "..."}
          btnText="Go to my account"
          description="Payment Successfull"
          link="/my-account"
        />
      )}
    </div>
  );
};

export default SuccessPage;
