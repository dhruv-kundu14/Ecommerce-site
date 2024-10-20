// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('jwtToken');
//         if (token) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const login = () => {
//         setIsAuthenticated(true);
//     };

//     const logout = () => {
//         localStorage.removeItem('jwtToken'); // Remove the token on logout
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check localStorage for existing token to initialize authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jwtToken') !== null; // Initialize state based on token presence
  });

  const login = (token) => {
    localStorage.setItem('jwtToken', token); // Store token in localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

