// localStorage utility functions for Terra application
// Centralized data persistence layer

const STORAGE_PREFIX = 'terra_';

const storage = {
  // Get data from localStorage
  getData: (key) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key ${key}:`, error);
      return null;
    }
  },

  // Set data in localStorage
  setData: (key, value) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key ${key}:`, error);
      return false;
    }
  },

  // Update data in localStorage using an updater function
  updateData: (key, updater) => {
    try {
      const current = storage.getData(key) || [];
      const updated = updater(current);
      return storage.setData(key, updated);
    } catch (error) {
      console.error(`Error updating localStorage key ${key}:`, error);
      return false;
    }
  },

  // Remove data from localStorage
  removeData: (key) => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage key ${key}:`, error);
      return false;
    }
  },

  // Initialize default data if not present
  initialize: (key, defaultValue) => {
    if (!storage.getData(key)) {
      return storage.setData(key, defaultValue);
    }
    return true;
  }
};

export default storage;