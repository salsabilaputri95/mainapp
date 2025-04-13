'use client';

import React, { createContext, useContext, useState } from 'react';

// Buat context untuk SoftUIController
const SoftUIControllerContext = createContext();

// Provider untuk SoftUIController
export const SoftUIControllerProvider = ({ children }) => {
  const [controller, setController] = useState({
    darkMode: false,
    sidebarOpen: true,
    // Tambahkan state lain yang diperlukan
  });

  const toggleDarkMode = () => {
    setController((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleSidebar = () => {
    setController((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  return (
    <SoftUIControllerContext.Provider value={{ controller, toggleDarkMode, toggleSidebar }}>
      {children}
    </SoftUIControllerContext.Provider>
  );
};

// Hook untuk menggunakan SoftUIController
export const useSoftUIController = () => {
  const context = useContext(SoftUIControllerContext);
  if (!context) {
    throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
  }
  return context;
};