import React, { useState } from "react";
import "../styles/splashscreen.css";

export default function SplashScreen({ onLogin }) {
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 1500); // simulate sending
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  return (
    <div className="splash-container">
      <h1 className="splash-title">NeuroEdge</h1>

      <div className="splash-loader"></div>

      <button className="splash-btn" onClick={onLogin}>
        Sign In / Get Started
      </button>

      <input
        type="file"
        multiple
        onChange={handleFiles}
        style={{ marginTop: "20px" }}
      />

      {files.length > 0 && (
        <div className="upload-preview">
          {files.map((file, idx) => (
            <div className="file-preview" key={idx}>
              {file.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(file)} alt={file.name} />
              ) : (
                <span>{file.name}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        className="splash-btn"
        onClick={handleSend}
        style={{ marginTop: "15px", position: "relative" }}
      >
        ➤ Send
        {isSending && <div className="loader-circle"></div>}
      </button>

      <p className="splash-footer">
        NeuroEdge can make mistakes. Check important info.
      </p>
    </div>
  );
    }
