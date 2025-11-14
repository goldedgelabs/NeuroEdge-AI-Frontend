import React from "react";
import "../styles/splashscreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <img src="/neuroedge-logo.png" alt="NeuroEdge Logo" className="splash-logo" />
      <p className="splash-text">NeuroEdge</p>
    </div>
  );
}
