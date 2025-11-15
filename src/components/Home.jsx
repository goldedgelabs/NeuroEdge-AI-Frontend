import React, { useState } from "react";
import MenuButtons from "./MenuButtons";
import VoiceCommandButton from "./VoiceCommandButton";
import ConnectionStatusDot from "./ConnectionStatusDot";
import LoginPage from "./LoginPage";

export default function Home({ currentUser }) {
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Handle send button click
  const handleSend = () => {
    if (!isSending) {
      setIsSending(true);
      // Simulate sending process (replace with API logic)
      setTimeout(() => setIsSending(false), 1500);
    }
  };

  // Handle file selection
  const handleFiles = (fileList) => {
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag-and-drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    setDragOver(false);
    e.dataTransfer.clearData();
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

      {/* Bottom input with drag-and-drop */}
      <div
        className={`bottom-input ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
