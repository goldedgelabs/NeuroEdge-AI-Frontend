import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1300); 
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <Home />;
}
