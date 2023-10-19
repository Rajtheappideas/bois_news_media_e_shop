import React from "react";
import Success from "../components/Success";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SuccessPage = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = useLocation().search;
  const token = query?.split("?")[1]?.split("=")[1];
  const navigate = useNavigate();

  const handleVerifyToken = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios("/api/verify-token", {
        method: "post",
        data: {
          token,
        },
      });
      setSubscriptionDetails(data?.subscription);
      setLoading(false);
    } catch (error) {
      navigate("/");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    handleVerifyToken();
  }, []);

  return (
    <div className="pb-5">
      {token && loading ? (
        <div className="loading py-14">Verifying....</div>
      ) : (
        <Success
          title={subscriptionDetails?.title ?? "..."}
          price={subscriptionDetails?.price}
          image={subscriptionDetails?.image}
          btnText="Go to my account"
          description="Subscription renewed successfully"
          link="/my-account"
        />
      )}
    </div>
  );
};

export default SuccessPage;
