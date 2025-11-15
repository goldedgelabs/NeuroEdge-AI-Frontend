import React from "react";
import "../styles/globals.css"; // ensures wave animation & colors

export default function VoiceCommandButton() {
  return (
    <button className="voice-btn" aria-label="Voice command">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </button>
  );
}
