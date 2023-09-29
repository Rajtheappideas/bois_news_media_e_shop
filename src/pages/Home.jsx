import React from "react";
import HeroSection from "../components/Home/HeroSection";
import PurchaseByNumber from "../components/Home/PurchaseByNumber";
import { Helmet } from "react-helmet";
import SeeOtherIsse from "../components/Home/SeeOtherIsse";
import SubScribe from "../components/Home/Subscribe";
import { useSelector } from "react-redux";

const Home = () => {
  const { latestMagazines, magazineLoading } = useSelector(
    (state) => state.root.shop
  );
  return (
    <>
      <Helmet>
        <title>Home | E-shop</title>
      </Helmet>
      <div className="md:space-y-20 space-y-3">
        <HeroSection />
        <SubScribe />
        {magazineLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            {latestMagazines !== null &&
              latestMagazines !== undefined &&
              latestMagazines?.boismag?.length > 0 && (
                <PurchaseByNumber
                  bgColor="#F1152B"
                  category="boismag"
                  magazines={latestMagazines?.boismag}
                  titleImg={require("../assests/images/boisTitle.png")}
                />
              )}
            {latestMagazines !== null &&
              latestMagazines !== undefined &&
              latestMagazines?.agenceur?.length > 0 && (
                <PurchaseByNumber
                  from="#00A9AF"
                  to="#007B7D"
                  category="agenceur"
                  magazines={latestMagazines?.agenceur}
                  titleImg={require("../assests/images/langecuarTitle.png")}
                />
              )}
            {latestMagazines !== null &&
              latestMagazines !== undefined &&
              latestMagazines?.artisans_and_bois?.length > 0 && (
                <PurchaseByNumber
                  from="#008CCD"
                  to="#00638B"
                  category="artisans_and_bois"
                  magazines={latestMagazines?.artisans_and_bois}
                  titleImg={require("../assests/images/artisansTitle.png")}
                />
              )}
            {latestMagazines !== null &&
              latestMagazines !== undefined &&
              latestMagazines?.toiture?.length > 0 && (
                <PurchaseByNumber
                  from="#003E79"
                  to="#001F3D"
                  category="toiture"
                  magazines={latestMagazines?.toiture}
                  titleImg={require("../assests/images/toitureTitle.png")}
                />
              )}
          </div>
        )}
        <SeeOtherIsse />
      </div>
    </>
  );
};

export default Home;
