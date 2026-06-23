import React from "react";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import ShippingTrainings from "../../components/home/ShippingTrainings";
import ShippingLocation from "../../components/home/ShippingLocation";
import Footer from "../../components/common/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ShippingTrainings />
      <StatsSection />
      <ShippingLocation />
      <Footer />
    </div>
  );
};

export default HomePage;
