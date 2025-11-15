import React, { useState } from "react";
import MenuButtons from "./MenuButtons";
import VoiceCommandButton from "./VoiceCommandButton";
import ConnectionStatusDot from "./ConnectionStatusDot";

export default function Home() {
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    setSending(true);
    // simulate async send
    setTimeout(() => setSending(false), 1500);
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

        <button className="signin-btn" aria-label="Sign In">Sign In</button>
      </header>

      <h2 className="question">What would you like NeuroEdge to do?</h2>

      <MenuButtons />

      <div className="bottom-input">
        <button className="attach-btn" aria-label="Attach file">+</button>
        <input
          placeholder="Ask NeuroEdge anything..."
          aria-label="Type your question"
        />
        <VoiceCommandButton />
        <button
          className={`send-btn ${sending ? "sending" : ""}`}
          onClick={handleSend}
          aria-label="Send"
        >
          <span className="send-text">➤</span>
          <span className="spinner"></span>
        </button>
      </div>

      <footer className="footer-note">
        NeuroEdge can make mistakes. Check important info.
      </footer>
    </div>
  );
}
