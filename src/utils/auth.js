// Authentication utilities for Terra application
// Demo authentication only.
// This project intentionally uses localStorage instead of a backend auth system.

import storage from './storage';

const auth = {
  // Check if user is logged in
  isAuthenticated: () => {
    const session = storage.getData('terra_session');
    return session !== null;
  },

  // Get current user from session
  getCurrentUser: () => {
    return storage.getData('terra_session');
  },

  // Login user
  login: (email, password) => {
    const users = storage.getData('users') || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Don't store password in session for security (even though it's a demo)
      const { password, ...userWithoutPassword } = user;
      storage.setData('terra_session', userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid email or password' };
  },

  // Register new user
  register: (userData) => {
    const users = storage.getData('users') || [];

    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()-Math.floor(Math.random() * 10000)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: userData.role || 'sponsor',
      isOrganizer: userData.isOrganizer || false,
      organizationName: userData.organizationName || '',
      organizationAbout: userData.organizationAbout || '',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    storage.setData('users', updatedUsers);

    // Don't store password in session
    const { password, ...userWithoutPassword } = newUser;
    storage.setData('terra_session', userWithoutPassword);

    return { success: true, user: userWithoutPassword };
  },

  // Logout user
  logout: () => {
    storage.removeData('terra_session');
  },

  // Update user profile
  updateProfile: (updates) => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    const users = storage.getData('users') || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      // Keep original password and creation date
      password: users[userIndex].password,
      createdAt: users[userIndex].createdAt
    };

    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    storage.setData('users', updatedUsers);

    // Update session
    const { password, ...sessionUser } = updatedUser;
    storage.setData('terra_session', sessionUser);

    return { success: true, user: sessionUser };
  }
};

export default auth;