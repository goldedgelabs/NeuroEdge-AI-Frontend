import React, { useState } from "react";
import MenuButtons from "./MenuButtons";
import VoiceCommandButton from "./VoiceCommandButton";
import ConnectionStatusDot from "./ConnectionStatusDot";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (loading) return;
    setLoading(true);

    // Simulate sending / processing
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="home-container">
      <header className="top-bar">
        <h1 className="title">NeuroEdge</h1>

        <div className="status-dots">
          <ConnectionStatusDot color="cyan" />
          <ConnectionStatusDot color="yellow" />
          <ConnectionStatusDot color="red" />
        </div>

        <button className="signin-btn" aria-label="Sign In">
          Sign In
        </button>
      </header>

      <h2 className="question">What would you like NeuroEdge to do?</h2>

      <MenuButtons />

      <div className="bottom-input">
        <button className="attach-btn" aria-label="Attach file">+</button>

        <div className={`input-wrapper ${loading ? "loading" : ""}`}>
          <input
            placeholder="Ask NeuroEdge..."
            aria-label="Type your question"
            disabled={loading}
          />
          {loading && <div className="rotating-loader"></div>}
        </div>

        <VoiceCommandButton />
        <button className="send-btn" aria-label="Send" onClick={handleSend}>
          ➤
        </button>
      </div>

      <p className="footer-note">NeuroEdge can make mistakes. Check important info.</p>
    </div>
  );
        }
