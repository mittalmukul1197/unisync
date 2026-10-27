import React, { createContext, useContext, useState } from "react";

export const FacultyContext = createContext(null);

export function FacultyProvider({ children }) {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

export function useFaculty() {
  return useContext(FacultyContext);
}

export default FacultyContext;