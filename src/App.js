import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

/**
 * App Root: Handles Protected Routing and Authentication State
 */
function App() {
  const [user, setUser] = useState(null);

  // Persistence check: Session restore on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLoginSuccess = (userData) => {
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
        {/* Auth Route: Redirects to dashboard if already logged in */}
        <Route 
          path="/" 
          element={!user ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" replace />} 
        />

        {/* Protected Dashboard: Redirects to login if not authenticated */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} 
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;