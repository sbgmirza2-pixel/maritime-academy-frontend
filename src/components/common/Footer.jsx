import React from "react";
// Image ko yahan use kiya hai
import heroBg from '../../assets/footer.png'; 

const Footer = () => {
  const navLinks = ["HOME", "TRANING", "TRIP", "LOCATION", "CONTACT US"];
  const footerLinks = ["PRIVACY POLICY", "TERM AND CONDITION", "FAQS", "ABOUT"];

  const socialIcons = [
    {
      label: "Facebook",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      content: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        background: "#071628",
        color: "white",
        overflow: "visible",
        position: "relative",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 64px", position: "relative" }}>

        {/* Yacht Image — local reference updated here */}
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-120px",
            width: "380px",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          <img
            src={heroBg}
            alt="Luxury yacht"
            style={{
              width: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
            }}
          />
        </div>

        {/* TOP ROW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            minHeight: "90px",
            position: "relative",
          }}
        >
          {/* Social Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {socialIcons.map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "transparent",
                  border: "1.5px solid #22d3ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,211,238,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {icon.content}
              </a>
            ))}
          </div>

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: link === "HOME" ? "#22d3ee" : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  paddingBottom: "6px",
                  position: "relative",
                  transition: "color 0.2s",
                }}
              >
                {link}
                {link === "HOME" && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "#22d3ee",
                      boxShadow: "0 0 8px rgba(34,211,238,0.9)",
                    }}
                  />
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "20px",
            paddingBottom: "24px",
          }}
        >
          {/* Language Selector */}
          <button
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "8px 20px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.65)",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              marginRight: "60px",
            }}
          >
            ENGLISH
            <svg width="11" height="11" fill="none" stroke="#22d3ee" strokeWidth={2.5} viewBox="0 0 24 24" strokeLinecap="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Footer Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
              whiteSpace: "nowrap",
              marginLeft: "auto",
            }}
          >
            COPYRIGHT BY BOAT ALL RIGHT RESERVED 2024!
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;