import React from "react";

export default function VoiceCommandButton() {
  return (
    <button 
      className="voice-btn" 
      aria-label="Activate Voice Command"
      style={{ transition: 'all 0.2s ease' }}
    >
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </button>
  );
}
