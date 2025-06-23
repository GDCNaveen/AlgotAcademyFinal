
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EXPIRY_DATE = new Date('2025-06-23T21:20:00');

const users = [
  { username: 'Bunny', password: '123' },
  { username: 'Shivaiah', password: '108' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in and session hasn't expired
    const storedUser = localStorage.getItem('algot_user');
    const loginTime = localStorage.getItem('algot_login_time');
    
    if (storedUser && loginTime) {
      const currentTime = new Date();
      if (currentTime < EXPIRY_DATE) {
        setIsAuthenticated(true);
        setUser(storedUser);
      } else {
        // Session expired
        logout();
      }
    }

    // Set up expiry check
    const checkExpiry = () => {
      const currentTime = new Date();
      if (currentTime >= EXPIRY_DATE && isAuthenticated) {
        logout();
        alert('Session expired. Please login again.');
      }
    };

    const interval = setInterval(checkExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const currentTime = new Date();
      if (currentTime < EXPIRY_DATE) {
        setIsAuthenticated(true);
        setUser(username);
        localStorage.setItem('algot_user', username);
        localStorage.setItem('algot_login_time', currentTime.toISOString());
        return true;
      } else {
        alert('Access expired. Please contact administrator.');
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('algot_user');
    localStorage.removeItem('algot_login_time');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
