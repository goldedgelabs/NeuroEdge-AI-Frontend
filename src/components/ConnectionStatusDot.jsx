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
      className="status-dot"
      style={{
        backgroundColor: online ? colors[color] : "#444",
      }}
    />
  );
}
