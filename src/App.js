import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

/**
 * App.js - Updated with Routing and Protected Dashboard
 */
function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    // Save user data for session persistence
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route 
          path="/" 
          element={
            !user ? (
              <AuthPage onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />

        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;