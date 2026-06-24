import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import locationBg from '../../assets/location.png'; 

const ShippingLocation = () => {
  const [trips, setTrips] = useState([]);
  const [activeLocation, setActiveLocation] = useState({ name: 'VAL DI VERSA', country: 'ITALY' });
  const [loading, setLoading] = useState(true);

  const defaultImages = [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=400&q=80"
  ];

  // Guaranteed 3 items fallback entries
  const fallbackTrips = [
    { id: 'f1', location_name: 'VAL DI VERSA', country: 'ITALY', available_slots: 3, description: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. QUIS IPSUM SUSPENDISSE ULTRICES GRAVIDA.' },
    { id: 'f2', location_name: 'ISTANBUL', country: 'TURKEY', available_slots: 3, description: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. VIVERRA MAECENAS ACCUMSAN LACUS VEL.' },
    { id: 'f3', location_name: 'TOWER BRIDGE', country: 'LONDON', available_slots: 3, description: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. VIVERRA MAECENAS ACCUMSAN LACUS VEL.' }
  ];

  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        setLoading(true);
        const response = await bookingService.getTrips({ limit: 3 });
        
        if (response && response.trips && response.trips.length > 0) {
          let mergedTrips = [...response.trips];
          
          // Agar database me entries 2 hain toh automatic 3 entries poori karega
          if (mergedTrips.length < 3) {
            const needed = 3 - mergedTrips.length;
            for (let i = 0; i < needed; i++) {
              mergedTrips.push(fallbackTrips[mergedTrips.length]);
            }
          }
          setTrips(mergedTrips);
          setActiveLocation({
            name: mergedTrips[0].location_name,
            country: mergedTrips[0].country
          });
        } else {
          setTrips(fallbackTrips);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shipping locations:", err);
        setTrips(fallbackTrips);
        setLoading(false);
      }
    };

    fetchTripsData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#021526] text-white py-20 px-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="text-sm font-sans tracking-widest text-cyan-400 uppercase">Loading Academy Routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="locations-section" className="relative w-full h-auto text-white overflow-hidden flex items-center select-none bg-[#021424]">
      
      {/* 🏞️ NATURAL BACKGROUND LAYER: Image ratio ke hisab se resize hogi, upar-neeche se cut nahi hogi */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src={locationBg} 
          alt="Yacht Background" 
          className="w-full h-full object-fill opacity-100" 
        />
        {/* Soft shadow tint layout balance ke liye */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] bg-gradient-to-r from-transparent via-[#021424]/30 to-[#021424]/75"></div>
      </div>
      
      {/* 🎴 CONTENT WRAPPER GRID */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 px-6 md:px-16 lg:px-20 py-16 lg:py-24">
        
        {/* 🚢 LEFT SIDE: TOP RATING & ITALY DYNAMIC TYPOGRAPHY */}
     <div className="lg:col-span-5 flex flex-col items-start text-left self-start lg:-mt-8">
  {/* Top Rating Label - Size Bada Kar Diya */}
  <span className="text-white text-sm md:text-lg font-sans font-extrabold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
    TOP RATING
  </span>
  
  {/* Stars Grid */}
  <div className="flex items-center gap-1 text-amber-400 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pt-1 pb-2">
    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
  </div>
  
  {/* Main Country Render Title */}
  <h3 className="text-6xl md:text-[5.5rem] font-sans font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 via-cyan-300 to-cyan-400 uppercase leading-none filter drop-shadow-[0_0_25px_rgba(34,211,238,0.55)] m-0">
    {activeLocation.country}
  </h3>
</div>

        {/* 🪟 RIGHT SIDE: TRANSLUCENT GLASSMORPHIC BLOCK (Guaranteed 3 Items Displayed) */}
        <div className="lg:col-span-7 bg-[#041c30]/60 border border-white/10 p-5 md:p-8 rounded-xl shadow-2xl space-y-6 max-w-xl w-full justify-self-center lg:justify-self-end">
          
          {trips.map((loc, index) => {
            const isSelected = activeLocation.name === loc.location_name;
            
            return (
              <div 
                key={loc.id || index} 
                onMouseEnter={() => setActiveLocation({ name: loc.location_name, country: loc.country })}
                className="flex flex-col sm:flex-row gap-5 items-center sm:items-start transition-all duration-300 group cursor-pointer"
              >
                {/* Destination Rounded Thumbnail Card */}
                <img 
                  src={loc.image_url || defaultImages[index % defaultImages.length]} 
                  alt={loc.location_name} 
                  className="w-full sm:w-[150px] h-[110px] object-cover rounded-xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 shrink-0"
                />

                {/* Info Metadata Block */}
                <div className="flex-1 text-left space-y-1 w-full">
                  
                  {/* Location Title */}
                  <h4 className="text-lg font-sans font-extrabold text-white tracking-wide uppercase group-hover:text-cyan-300 transition-colors">
                    {loc.location_name}
                  </h4>
                  
                  {/* Mini Meta Info */}
                  <div className="text-[10px] font-sans font-bold tracking-wider text-slate-300 uppercase flex flex-wrap gap-2 items-center opacity-90">
                    <span>April 6</span>
                    <span className="text-slate-500">|</span>
                    <span>14 Days</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-cyan-400">{loc.available_slots} People Left</span>
                  </div>

                  {/* Description Element */}
                  <p className="text-slate-300/90 text-[10px] sm:text-[10.5px] font-sans font-normal leading-relaxed tracking-wide line-clamp-3 uppercase">
                    {loc.description}
                  </p>
                  
                  {/* Action UI Trigger */}
                  <div className="pt-2">
                    {isSelected ? (
                      <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-[#021526] font-sans font-bold text-[9px] tracking-widest px-5 py-2.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer uppercase">
                        BOOK TOUR
                      </button>
                    ) : (
                      <span className="text-cyan-400/80 group-hover:text-cyan-300 text-[9px] font-sans font-bold tracking-widest uppercase transition-colors inline-block pt-1">
                        VIEW OUR TOUR
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default ShippingLocation;