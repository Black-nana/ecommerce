// Import necessary modules
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';


// Define the structure of the user object
interface User {
  id: number;
  uername:string;
  token?: string; // Optional token property
  // Add other properties as needed
}

// Define the structure of the authentication context
interface AuthContextType {
  user: User | null;
  login: (userData: any) => Promise<boolean>;
  logout: () => void;
}

// Create an authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create an authentication provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to store the user object
  const [user, setUser] = useState<User | null>(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Define the login function
  const login = async (userData: any): Promise<boolean> => {
    try {
      const response = await axios.post<User>('https://fakestoreapi.com/auth/login', userData);
      const responseUser = response.data;

      // If the login was successful, store the user's information in local storage
      if (responseUser) {
        setUser(responseUser);
        localStorage.setItem('user', JSON.stringify(responseUser));
        return true; // Login was successful
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
    return false; // Login failed
  };

 

  // Define the logout function
  const logout = (): void => {
    // Clear the user state and remove the user from local storage
    setUser(null);
    localStorage.removeItem('user');
  };

  // Provide the authentication context value to children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to consume authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
