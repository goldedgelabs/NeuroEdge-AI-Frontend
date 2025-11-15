import React from "react";

export default function VoiceCommandButton() {
  return (
    <button 
      className="voice-btn" 
      aria-label="Activate Voice Command"
    >
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </button>
  );
}
