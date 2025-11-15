import React, { useState } from "react";
import "../styles/globals.css"; // ensures wave animation & colors

export default function VoiceCommandButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // Start loading animation
    setLoading(true);

    // Simulate sending or processing voice command
    setTimeout(() => {
      setLoading(false);
      alert("Voice Command is a premium feature! Upgrade to Pro to use it.");
    }, 2000); // 2s loading simulation
  };

  return (
    <button
      className="voice-btn premium-btn"
      onClick={handleClick}
      aria-label="Voice command (Premium)"
      title="Premium Feature"
    >
      {loading ? (
        // Rotating loader circle
        <div className="loader-circle"></div>
      ) : (
        // Normal 3-wave animation when idle
        <>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </>
      )}
    </button>
  );
    }
