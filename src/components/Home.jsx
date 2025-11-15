import React, { useState, useRef } from "react";
import MenuButtons from "./MenuButtons";
import VoiceCommandButton from "./VoiceCommandButton";
import ConnectionStatusDot from "./ConnectionStatusDot";
import LoginPage from "./LoginPage";

export default function Home({ currentUser }) {
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropRef = useRef(null);

  // Handle send button click
  const handleSend = () => {
    if (!isSending) {
      setIsSending(true);
      setTimeout(() => setIsSending(false), 1500);
    }
  };

  // Handle files (from input or drop)
  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  // Input change
  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
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

      {/* Drag & Drop / File Upload */}
      <div
        className="bottom-input"
        ref={dropRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
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

        <input
          placeholder="Ask NeuroEdge anything..."
          aria-label="Type your question"
        />

        <VoiceCommandButton />

        <button
          className="send-btn premium-btn"
          onClick={handleSend}
          aria-label="Send"
        >
          {isSending ? <div className="loader-circle"></div> : "➤"}
        </button>
      </div>

      {/* File preview */}
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
        <div
          className="login-modal-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginPage onClose={() => setShowLoginModal(false)} />
            <button
              className="login-modal-close"
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
