import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types/cms';
import { authService } from '../services/authService';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AdminUser>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsLoading(false);

    const unsubscribe = authService.subscribe((newUser) => {
      setUser(newUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    return await authService.login(email, pass);
  };

  const logout = () => {
    authService.logout();
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    return await authService.changePassword(oldPass, newPass);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
