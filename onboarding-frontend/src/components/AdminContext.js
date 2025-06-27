import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Default configuration for page 2 and page 3
  const [config, setConfig] = useState({
    page1: ['email', 'password', 'firstName', 'lastName'],
    page2: ['address', 'birthdate'], 
    page3: ['aboutMe'],
  });

  return (
    <AdminContext.Provider value={{ config, setConfig }}>
      {children}
    </AdminContext.Provider>
  );
};
