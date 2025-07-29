import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'manufacturer' | 'seller' | 'buyer' | 'transporter' | 'donor' | 'admin';
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  paymentMethods: string[];
  isVerified: boolean;
  createdAt: Date;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dignify_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('dignify_user');
      }
    }
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('dignify_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dignify_user');
  };

  const contextValue = {
    user,
    setUser: (newUser: User | null) => {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem('dignify_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('dignify_user');
      }
    },
    updateUser,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};