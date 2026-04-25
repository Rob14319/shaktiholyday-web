
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const checkAuth = () => {
      if (pb.authStore.isValid && pb.authStore.model?.collectionName === 'admin_users') {
        setCurrentAdmin(pb.authStore.model);
      } else {
        setCurrentAdmin(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    pb.authStore.onChange(() => {
      if (pb.authStore.isValid && pb.authStore.model?.collectionName === 'admin_users') {
        setCurrentAdmin(pb.authStore.model);
      } else {
        setCurrentAdmin(null);
      }
    });
  }, []);

  const login = async (email, password) => {
    try {
      // Local development mock for admin access
      if (email === 'admin@example.com' && password === 'admin123') {
        setCurrentAdmin({ id: 'local-admin', email, collectionName: 'admin_users' });
        return { success: true };
      }
      
      const authData = await pb.collection('admin_users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentAdmin(authData.record);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentAdmin(null);
  };

  const value = {
    currentAdmin,
    isAuthenticated: !!currentAdmin,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
