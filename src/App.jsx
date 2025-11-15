import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // wait for auth check

  // Splash screen fade-out
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 900);
    const removeTimer = setTimeout(() => setShowSplash(false), 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (showSplash) return <SplashScreen />;

  if (loadingAuth) return <div className="auth-loading">Checking authentication...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Optional login: show LoginPage modal only if user clicks "Get Started" */}
        <Route
          path="/login"
          element={<LoginPage />}
        />
        {/* Main app: allow guest users */}
        <Route
          path="/app"
          element={<Home currentUser={currentUser} />}
        />
        <Route
          path="*"
          element={<Navigate to="/app" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
