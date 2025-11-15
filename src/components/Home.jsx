import React, { useState } from "react";
import MenuButtons from "./MenuButtons";
import VoiceCommandButton from "./VoiceCommandButton";
import ConnectionStatusDot from "./ConnectionStatusDot";
import LoginPage from "./LoginPage";

export default function Home({ currentUser }) {
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handle send button click
  const handleSend = () => {
    if (!isSending) {
      setIsSending(true);
      // Simulate sending process (replace with API logic)
      setTimeout(() => setIsSending(false), 1500);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
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

        {/* Optional login modal trigger */}
        {!currentUser && (
          <button
            className="signin-btn premium-btn"
            aria-label="Sign In"
            onClick={() => setShowLoginModal(true)}
          >
            Get Started
          </button>
        )}
      </header>

      <h2 className="question">What would you like NeuroEdge to do?</h2>

      <MenuButtons />

      <div className="bottom-input">
        {/* Attach / Upload Button */}
        <label htmlFor="file-upload" className="attach-btn premium-btn" title="Upload files">
          📎
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,video/*,application/pdf,*/*"
        />

        {/* Text Input */}
        <input
          placeholder="Ask NeuroEdge anything..."
          aria-label="Type your question"
        />

        {/* Voice Command Button */}
        <VoiceCommandButton />

        {/* Send Button with loader */}
        <button
          className="send-btn premium-btn"
          onClick={handleSend}
          aria-label="Send"
        >
          {isSending ? <div className="loader-circle"></div> : "➤"}
        </button>
      </div>

      {/* Preview uploaded files */}
      {files.length > 0 && (
        <div className="upload-preview">
          {files.map((file, index) => (
            <div key={index} className="file-preview">
              {file.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(file)} alt={file.name} />
              ) : file.type.startsWith("video/") ? (
                <video src={URL.createObjectURL(file)} controls />
              ) : (
                <p>{file.name}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <LoginPage />
            <button
              className="close-modal-btn"
              onClick={() => setShowLoginModal(false)}
              aria-label="Close Login Modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <p className="footer-note">
        NeuroEdge can make mistakes. Check important info.
      </p>
    </div>
  );
        }
