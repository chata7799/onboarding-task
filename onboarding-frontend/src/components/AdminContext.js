import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Default configuration for page 2 and page 3
  const [config, setConfig] = useState({
    page2: ['address', 'birthdate'], // Initial default configuration for page 2
    page3: ['aboutMe'], // Initial default configuration for page 3
  });

  return (
    <AdminContext.Provider value={{ config, setConfig }}>
      {children}
    </AdminContext.Provider>
  );
};
