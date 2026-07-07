import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faClock, faDollarSign, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const FleetTracking = ({ data, onBook }) => {
  const title = data?.title ?? data?.name ?? "Fleet Tracking";
  const description = data?.description ?? data?.details ?? "Monitor fleet activities, vessel locations and shipping routes with real-time updates and analytics.";
  const price = data?.price ?? 2200;
  const duration = data?.duration_days ?? 10;
  const features = data?.features || [
    "Real-time GPS Tracking",
    "Route Optimization Analytics",
    "Vessel Health Monitoring",
    "Fuel Efficiency Reports"
  ];
  const isRealData = !!data?.id;

  return (
    <div className="relative bg-[#041c30]/75 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 rounded-2xl shadow-2xl p-6 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300 pointer-events-none"></div>
      
      <div>
        {/* Header with Icon and Real Data Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
            <FontAwesomeIcon icon={faCompass} />
          </div>
          {isRealData ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Data
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
              Preview
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-sans font-bold text-white mb-3 tracking-wide group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>

        {/* Badges */}
        <div className="flex gap-4 mb-5 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 px-2.5 py-1 rounded-lg">
            <FontAwesomeIcon icon={faClock} className="text-cyan-400 text-[11px]" />
            <span>{duration} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 px-2.5 py-1 rounded-lg">
            <FontAwesomeIcon icon={faDollarSign} className="text-[#C9A03D] text-[11px]" />
            <span className="font-bold text-[#C9A03D]">{price.toLocaleString()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed mb-6 min-h-[60px]">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2.5 border-t border-white/5 pt-5 mb-8">
          <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest mb-3">Key Solutions:</p>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <FontAwesomeIcon icon={faCheckCircle} className="text-cyan-500 text-[11px] mt-0.5 shrink-0" />
              <span className="text-slate-300 text-xs leading-tight uppercase font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button 
        onClick={onBook}
        className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#021526] hover:opacity-95 font-sans font-bold py-3 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 text-xs uppercase tracking-widest cursor-pointer"
      >
        Book Service
      </button>
    </div>
  );
};

export default FleetTracking;
