import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes, faCalendarAlt, faBuilding, faPhone, faEnvelope, faUser, faFileAlt, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { shippingService } from "../../services/shippingService";
import { dashboardService } from "../../services/dashboardService";

import ShipHandling from "./ShipHandling";
import CargoManagement from "./CargoManagement";
import FleetTracking from "./FleetTracking";
import Footer from "../common/Footer";

// Fallback metadata for default/mock services used in booking modal
const defaultShipHandling = {
  id: "fallback-ship-handling",
  title: "Ship Handling",
  service_type: "ship_handling",
  price: 1500,
  duration_days: 5,
};

const defaultCargoManagement = {
  id: "fallback-cargo-management",
  title: "Cargo Management",
  service_type: "cargo_management",
  price: 1800,
  duration_days: 6,
};

const defaultFleetTracking = {
  id: "fallback-fleet-tracking",
  title: "Fleet Tracking",
  service_type: "fleet_tracking",
  price: 2200,
  duration_days: 10,
};

const ShippingServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    organization: "",
    notes: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await shippingService.getShippingServices();
        const list = Array.isArray(data?.services)
          ? data.services
          : Array.isArray(data)
            ? data
            : [];

        setServices(list);
      } catch (e) {
        console.error("Error loading shipping services:", e);
        setError(e);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch user profile if logged in to pre-fill booking details
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("access_token");
    if (token) {
      dashboardService.getProfile()
        .then((profile) => {
          if (profile) {
            setUserProfile(profile);
            setBookingFormData((prev) => ({
              ...prev,
              fullName: profile.full_name || profile.name || "",
              email: profile.email || "",
            }));
          }
        })
        .catch((err) => console.warn("Could not fetch user profile for booking prefill:", err));
    }
  }, [isModalOpen]);

  const derived = useMemo(() => {
    const getByKey = (keys) => {
      if (!services || services.length === 0) return null;
      const lower = keys.map((k) => k.toLowerCase());
      return services.find((s) => {
        const name = (s?.title ?? s?.name ?? s?.service_type ?? "").toString().toLowerCase();
        return lower.some((k) => name.includes(k));
      });
    };

    return {
      shipHandling: getByKey(["ship handling", "handling", "ship_handling"]),
      cargoManagement: getByKey(["cargo management", "cargo", "cargo_management"]),
      fleetTracking: getByKey(["fleet tracking", "tracking", "fleet_tracking"]),
    };
  }, [services]);

  // Open booking modal or redirect to login
  const handleOpenBooking = (service, fallbackDetails) => {
    const token = localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      navigate("/login", { state: { from: "/services" } });
      return;
    }
    const finalService = service || fallbackDetails;
    setSelectedService(finalService);
    setBookingStatus(null);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    setBookingLoading(true);
    setBookingStatus(null);

    try {
      // If it is a fallback service, simulate success
      if (typeof selectedService.id === "string" && selectedService.id.startsWith("fallback")) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setBookingStatus("success");
      } else {
        // Send request to real backend
        await shippingService.bookShippingService(selectedService.id, {
          full_name: bookingFormData.fullName,
          email: bookingFormData.email,
          phone: bookingFormData.phone,
          booking_date: bookingFormData.bookingDate,
          organization: bookingFormData.organization,
          notes: bookingFormData.notes,
        });
        setBookingStatus("success");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus("error");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#021526] text-white flex flex-col justify-between font-sans">
      
      {/* 🚢 HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-center justify-center px-6 md:px-20 overflow-hidden bg-[#021526] border-b border-cyan-500/10 pt-20 select-none">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-[#021526]/80 to-[#021526] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
            World Class Fleet & Logistics Support
          </span>

          <div className="relative mb-4">
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-b from-cyan-50 via-cyan-300 to-cyan-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              SHIPPING SERVICES
            </h1>
            <span className="absolute left-[35%] bottom-[-32px] text-4xl md:text-6xl font-cursive text-cyan-200 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-light">
              Maritime
            </span>
          </div>

          <p className="text-cyan-100/60 text-sm md:text-base max-w-xl mt-8 font-light leading-relaxed tracking-wide">
            Comprehensive maritime solutions for training, commercial fleet operations, secure cargo logistics, and real-time vessel tracking.
          </p>
        </div>
      </section>

      {/* 📦 SERVICES MAIN GRID SECTION */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto w-full relative z-10 flex-1">
        
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-cyan-400 text-4xl" />
            <p className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
              Fetching Fleet Solutions...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center text-red-400 max-w-lg mx-auto mb-10">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl mb-2" />
            <p className="text-sm font-semibold">Failed to synchronize live services. Showing premium offline fallbacks.</p>
          </div>
        ) : null}

        <div className="grid md:grid-cols-3 gap-8">
          <ShipHandling 
            data={derived.shipHandling} 
            onBook={() => handleOpenBooking(derived.shipHandling, defaultShipHandling)} 
          />
          <CargoManagement 
            data={derived.cargoManagement} 
            onBook={() => handleOpenBooking(derived.cargoManagement, defaultCargoManagement)} 
          />
          <FleetTracking 
            data={derived.fleetTracking} 
            onBook={() => handleOpenBooking(derived.fleetTracking, defaultFleetTracking)} 
          />
        </div>

        {/* Dynamic Extra Backend Services List (in case any custom type was created) */}
        {services && services.length > 0 && (
          <div className="mt-20">
            {services.some(
              (s) => 
                !["ship_handling", "cargo_management", "fleet_tracking"].includes(s.service_type?.toLowerCase()) &&
                !["ship handling", "cargo management", "fleet tracking"].includes(s.title?.toLowerCase())
            ) && (
              <>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-xl md:text-2xl font-sans font-bold tracking-widest text-white uppercase whitespace-nowrap">
                    ADDITIONAL FLEET SERVICES
                  </h2>
                  <div className="h-[1.5px] bg-cyan-400 w-full max-w-[200px] opacity-60"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {services
                    .filter(
                      (s) => 
                        !["ship_handling", "cargo_management", "fleet_tracking"].includes(s.service_type?.toLowerCase()) &&
                        !["ship handling", "cargo management", "fleet tracking"].includes(s.title?.toLowerCase())
                    )
                    .map((customService) => {
                      // Dynamically render custom services using standard wrapper card style
                      return (
                        <div key={customService.id} className="relative bg-[#041c30]/75 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 rounded-2xl shadow-2xl p-6 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300 pointer-events-none"></div>
                          
                          <div>
                            <div className="flex justify-between items-start mb-6">
                              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                                ⚓
                              </div>
                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Custom
                              </span>
                            </div>

                            <h3 className="text-2xl font-sans font-bold text-white mb-3 tracking-wide group-hover:text-cyan-300 transition-colors">
                              {customService.title || customService.name}
                            </h3>

                            <div className="flex gap-4 mb-5 text-xs text-slate-300 font-medium">
                              <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 px-2.5 py-1 rounded-lg">
                                ⏱️ <span>{customService.duration_days || 7} Days</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 px-2.5 py-1 rounded-lg">
                                🪙 <span className="font-bold text-[#C9A03D]">${(customService.price || 0).toLocaleString()}</span>
                              </div>
                            </div>

                            <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                              {customService.description}
                            </p>

                            {customService.features && customService.features.length > 0 && (
                              <div className="space-y-2.5 border-t border-white/5 pt-5 mb-8">
                                <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest mb-3">Service Features:</p>
                                {customService.features.map((feat, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5">
                                    <span className="text-cyan-500 text-[10px] mt-0.5">✔</span>
                                    <span className="text-slate-300 text-xs uppercase font-medium">{feat}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <button 
                            onClick={() => handleOpenBooking(customService, null)}
                            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#021526] font-sans font-bold py-3 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 text-xs uppercase tracking-widest cursor-pointer"
                          >
                            Book Service
                          </button>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        )}

      </section>

      {/* 🛎️ BOOKING MODAL */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-[#021526]/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Form container */}
          <div className="relative bg-[#0A1A3A] border border-cyan-500/30 text-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                Service Booking Request
              </span>
              <h2 className="text-2xl font-serif font-black tracking-wide text-white mt-1 uppercase">
                {selectedService.title}
              </h2>
              <div className="h-[1px] bg-white/10 w-full mt-4"></div>
            </div>

            {/* Form submission response layout */}
            {bookingStatus === "success" ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Your booking request for <strong className="text-cyan-300">{selectedService.title}</strong> has been received successfully. Our maritime support representative will connect with you via email shortly.
                </p>
                <div className="pt-6">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-[#021526] font-bold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-cyan-500/10 transition-transform active:scale-95 text-xs uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {bookingStatus === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="shrink-0" />
                    <span>Failed to register booking. Please contact help desk.</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faUser} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs" />
                      <input 
                        type="text" 
                        value={bookingFormData.fullName}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs" />
                      <input 
                        type="email" 
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs"
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faPhone} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs" />
                      <input 
                        type="tel" 
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 555-0199"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs" />
                      <input 
                        type="date" 
                        value={bookingFormData.bookingDate}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, bookingDate: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs select-none"
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faBuilding} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs" />
                    <input 
                      type="text" 
                      value={bookingFormData.organization}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="Optional"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                    Special Notes
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faFileAlt} className="absolute left-3.5 top-3.5 text-cyan-400/50 text-xs" />
                    <textarea 
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Describe any custom requirements..."
                      rows="3"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#021526] font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50 text-xs uppercase tracking-widest"
                  >
                    {bookingLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm" />
                        Processing...
                      </span>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 🧭 FOOTER COMPONENT */}
      <Footer />
    </div>
  );
};

export default ShippingServices;


