import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'TRAINING', sectionId: 'training-section' },
    { name: 'TRIP', sectionId: 'trips-section' },
    { name: 'LOCATION', sectionId: 'locations-section' }, // 👈 Yeh dynamic section ko connect karega
    { name: 'CONTACT US', sectionId: 'contact-section' }
  ];

  // 🔄 Handles dynamic routing and section scrolling smoothly
  const handleNavigation = (link) => {
    if (link.name === 'HOME') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Agar user pehle se homepage par nahi hai, toh pehle navigate karein fir scroll
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollToSection: link.sectionId } });
      } else {
        // Agar pehle se home par hain, toh direct smoothly target section par scroll karein
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // 🔔 Listen to section scrolls if user redirects from another page (like /login)
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // State ko clear kar dein taake reload par bar bar auto-scroll na ho
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-20 py-4 ${
      isScrolled ? 'bg-[#021526]/80 backdrop-blur-md shadow-lg border-b border-cyan-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT: Yacht Logo Custom Design */}
        <div 
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col items-start select-none cursor-pointer group"
        >
          <div className="flex items-center gap-1">
            <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform duration-300">🛥️</span>
            <span className="text-white font-heading font-black tracking-widest text-lg uppercase">
              YACHT
            </span>
          </div>
          <span className="text-[7px] text-cyan-400 font-bold tracking-[0.4em] uppercase -mt-1 pl-7 opacity-80">
            Academy
          </span>
        </div>

        {/* CENTER/RIGHT: Modern Minimalist Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => {
            // Check checking dynamic highlighting active link
            const isHomeActive = link.name === 'HOME' && location.pathname === '/' && !window.scrollY;
            
            return (
              <button
                key={index}
                onClick={() => handleNavigation(link)}
                className="relative font-heading text-xs font-semibold tracking-[0.2em] text-white/80 hover:text-cyan-400 transition-colors duration-300 uppercase pb-1 group bg-transparent border-none cursor-pointer"
              >
                {link.name}
                {/* Custom active/hover neon border effect below text */}
                <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#06b6d4] transition-all duration-300 group-hover:w-full ${
                  isHomeActive ? 'w-full' : ''
                }`}></span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Icon Placeholder */}
        <div className="md:hidden text-white text-xl cursor-pointer hover:text-cyan-400 transition-colors">
          ☰
        </div>

      </div>
    </nav>
  );
};

export default Navbar;