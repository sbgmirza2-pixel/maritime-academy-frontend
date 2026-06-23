import React from "react";

const ShippingLocation = () => {
  const locations = [
    {
      title: "VAL DI VERSA",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "TURKEY",
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "LONDON",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section
      id="location"
      className="relative bg-[#07162d] text-white px-6 md:px-16 py-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07162d]/95 via-[#07162d]/35 to-[#07162d]/95" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase whitespace-nowrap">
            SHIPPING LOCATION
          </h2>
          <div className="h-[2px] w-full max-w-[260px] bg-cyan-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] gap-8 items-start">
          <div className="pt-2">
            <p className="text-xs font-bold tracking-widest uppercase mb-2">
              TOP RATING
            </p>
            <div className="text-yellow-400 text-xl tracking-widest mb-1">
              ★★★★★
            </div>
            <h3 className="text-6xl md:text-7xl font-black text-cyan-300 uppercase leading-none">
              ITALY
            </h3>
          </div>

          <div className="rounded-md border border-white/30 bg-cyan-500/15 backdrop-blur-[2px] p-5 md:p-6 shadow-[0_0_45px_rgba(0,255,255,0.2)]">
            <div className="space-y-5">
              {locations.map((location, index) => (
                <article
                  key={location.title}
                  className="grid grid-cols-[130px_1fr] md:grid-cols-[170px_1fr] gap-5 items-start"
                >
                  <img
                    src={location.image}
                    alt={location.title}
                    className="h-32 md:h-36 w-full object-cover rounded-sm"
                  />

                  <div className="pt-1">
                    <h3 className="text-xl md:text-2xl font-bold uppercase mb-2">
                      {location.title}
                    </h3>

                    <p className="text-[10px] md:text-xs leading-relaxed text-cyan-50/80 uppercase max-w-md">
                      LOREM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING
                      INDUSTRY. LOREM IPSUM HAS BEEN THE INDUSTRY'S STANDARD
                      DUMMY TEXT.
                    </p>

                    {index === 0 && (
                      <button className="mt-3 bg-cyan-400 text-[#07162d] px-5 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors">
                        BOOK TOUR
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingLocation;