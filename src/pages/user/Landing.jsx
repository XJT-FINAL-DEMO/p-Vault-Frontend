import React from "react";
import HeroSection from "../../components/HeroSection";
import PVaultFeatures from "../../components/PVaultFeatures";
import FAQSection from "../../components/FAQSection";
import PVaultCare from "../../components/PVaultCare";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <PVaultFeatures />
      <PVaultCare />
      <FAQSection />
    </div>
  );
};

export default Landing;
