import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '../utils/auth';
import { initializeSeedData } from '../data/seed';
import storage from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize seed data and check auth status on load
  useEffect(() => {
    // Initialize seed data
    initializeSeedData();

    // Check if user is logged in
    let currentUser = auth.getCurrentUser();

    // For testing: if no user is logged in, auto-login with demo sponsor credentials
    if (!currentUser) {
      const demoUser = {
        id: "user-sponsor-demo",
        name: "Demo Sponsor",
        email: "sponsor@terra.demo",
        phone: "+977-9841234567",
        role: "sponsor",
        isOrganizer: false,
        organizationName: "",
        organizationAbout: "",
        createdAt: "2026-09-01T10:00:00Z"
      };
      // Set the demo user in localStorage to simulate login
      storage.setData('terra_session', demoUser);
      currentUser = demoUser;
    }

    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const result = auth.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = (userData) => {
    const result = auth.register(userData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  const updateProfile = (updates) => {
    const result = auth.updateProfile(updates);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};