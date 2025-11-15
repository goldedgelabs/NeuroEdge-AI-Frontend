import React from "react";
import "../styles/splashscreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <img 
        src="/neuroedge-logo.png" 
        alt="NeuroEdge Logo" 
        className="splash-logo"
        style={{ animation: 'scaleFade 0.8s ease-in-out forwards' }}
      />
      <p 
        className="splash-text" 
        style={{ animation: 'fadeInText 0.8s ease-in-out forwards', animationDelay: '0.3s' }}
      >
        NeuroEdge
      </p>
    </div>
  );
}
