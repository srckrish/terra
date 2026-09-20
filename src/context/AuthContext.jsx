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
    const currentUser = auth.getCurrentUser();
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