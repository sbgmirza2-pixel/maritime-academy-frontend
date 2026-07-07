import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import ShippingTrainings from "../../components/home/ShippingTrainings";
import ShippingLocation from "../../components/home/ShippingLocation";
import Footer from "../../components/common/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section (YACHT Branding) */}
      <HeroSection />

      <StatsSection />

      <ShippingTrainings />

      {/* Navigate to Services */}
      <section className="bg-[#021526] text-white py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Explore Shipping Services</h2>
            <p className="text-cyan-200/80 mt-3">
              Ship handling, cargo management and fleet tracking—backed by academy solutions.
            </p>
            <div className="mt-8">
              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-[#021526] font-bold px-7 py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShippingLocation />

      <Footer />
    </div>
  );
};

export default HomePage;

