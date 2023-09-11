import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SubScribe from "./SubScribe";
import PurchaseByNumber from "../components/Home/PurchaseByNumber";
import NewsLetter from "../components/Home/NewsLetter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SubScribe />
      <PurchaseByNumber />
      <NewsLetter />
    </div>
  );
};

export default Home;
