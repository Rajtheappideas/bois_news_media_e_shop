import React from "react";
import HeroSection from "../components/Home/HeroSection";
import PurchaseByNumber from "../components/Home/PurchaseByNumber";
import { Helmet } from "react-helmet";
import SeeOtherIsse from "../components/Home/SeeOtherIsse";
import SubScribe from "../components/Home/Subscribe";

const Home = () => {
  return (
    <>
      <Helmet>
        <title style={{ color: "black" }}>Home | E-shop</title>
      </Helmet>
      <div className="md:space-y-20 space-y-3">
        <HeroSection />
        <SubScribe />
        <div>
          <PurchaseByNumber
            bgColor="#F1152B"
            titleImg={require("../assests/images/boisTitle.png")}
            img1={require("../assests/images/Product image-9.png")}
            img2={require("../assests/images/Product image-10.png")}
            img3={require("../assests/images/Product image-11.png")}
            title1="N°213 TREATMENT AND PRESERVATION OF WOOD"
            title2="N°213 SPECIAL WOOD AND SAWING FROM FRANCE #3 - Pre-order this issue!"
            title3="N°213 SPECIAL MACHINE"
          />
          <PurchaseByNumber
            from="#00A9AF"
            to="#007B7D"
            titleImg={require("../assests/images/langecuarTitle.png")}
            img1={require("../assests/images/Product image-6.png")}
            img2={require("../assests/images/Product image-7.png")}
            img3={require("../assests/images/Product image-8.png")}
            title1="N°69 WOOD IN LAYOUT"
            title2="No. 68 Special Development of workspaces"
            title3="No. 67 Special Development of sales areas"
          />
          <PurchaseByNumber
            from="#008CCD"
            to="#00638B"
            titleImg={require("../assests/images/artisansTitle.png")}
            img1={require("../assests/images/Product image-4.png")}
            img2={require("../assests/images/Product image-5.png")}
            img3={require("../assests/images/Product image-2.png")}
            title1="Interior fittings"
            title2="N°71 Terrace & Cladding File"
            title3="No. 70 TOOLS"
          />
          <PurchaseByNumber
            from="#003E79"
            to="#001F3D"
            titleImg={require("../assests/images/toitureTitle.png")}
            img1={require("../assests/images/Product image-3.png")}
            img2={require("../assests/images/Product image-3.png")}
            img3={require("../assests/images/Product image-3.png")}
            title1="N°30 SPECIAL ROOF WINDOW"
            title2="N°29 SPECIAL PHOTOVOLTAIC"
            title3="N°28 TERRACOTTA + ROOFTOP"
          />
          <SeeOtherIsse />
        </div>
      </div>
    </>
  );
};

export default Home;
