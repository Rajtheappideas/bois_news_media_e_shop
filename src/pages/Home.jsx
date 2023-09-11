import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SubScribe from "./SubScribe";
import PurchaseByNumber from "../components/Home/PurchaseByNumber";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title style={{ color: "black" }}>Home | E-shop</title>
      </Helmet>
      <div>
        <HeroSection />
        <SubScribe />
        <PurchaseByNumber />
      </div>
    </>
  );
};

export default Home;
