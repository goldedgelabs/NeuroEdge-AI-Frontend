import React, { useEffect, useState } from "react";

export default function ConnectionStatusDot({ color }) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const colors = {
    cyan: "#00eaff",
    yellow: "#ffcc00",
    red: "#ff0033"
  };

  return (
    <div
      className={`status-dot ${online ? 'online' : 'offline'}`}
      style={{
        backgroundColor: online ? colors[color] : '#444',
        boxShadow: online ? `0 0 12px ${colors[color]}` : '0 0 6px #444',
        transition: 'all 0.3s ease',
      }}
      title={online ? 'Online' : 'Offline'}
      aria-label={`Connection status: ${online ? 'online' : 'offline'}`}
    />
  );
}
