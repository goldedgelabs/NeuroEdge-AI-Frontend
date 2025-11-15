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

  useEffect(() => {
    // Splash screen fade-out timing
    const fadeTimer = setTimeout(() => setFadeOut(true), 900);
    const removeTimer = setTimeout(() => setShowSplash(false), 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (loadingAuth) {
    // Optional: show a loading spinner while checking auth
    return <div className="auth-loading">Checking authentication...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <LoginPage /> : <Navigate to="/app" />}
        />
        <Route
          path="/app"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={currentUser ? "/app" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
            }
