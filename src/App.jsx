import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out earlier for smoother transition
    const fadeTimer = setTimeout(() => setFadeOut(true), 900);
    const removeTimer = setTimeout(() => setShowSplash(false), 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className={`app-wrapper ${fadeOut ? "fade-out" : ""}`}>
      {showSplash ? <SplashScreen /> : <Home />}
    </div>
  );
}
