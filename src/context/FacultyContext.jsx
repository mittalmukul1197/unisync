import React, { createContext, useContext, useState } from "react";

// Create Context
export const FacultyContext = createContext(null);

// Faculty Context Provider
export function FacultyProvider({ children }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Shared Faculty Full Name
  const [fullName, setFullName] = useState("Mr. Rakesh Sharma");

  const contextValue = {
    activeTab,
    setActiveTab,
    fullName,
    setFullName,
  };

  return (
    <FacultyContext.Provider value={contextValue}>
      {children}
    </FacultyContext.Provider>
  );
}

// Custom Hook
export function useFaculty() {
  return useContext(FacultyContext);
}

// Default Export
export default FacultyContext;