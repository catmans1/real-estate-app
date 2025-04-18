import React, { createContext, useState, useEffect } from "react";
import { UserStatus, VisibleStatus } from "../constants";

// Define the types for the context
export interface UserStatusContextType {
  statuses: string[];
  visibleStatuses: string[];
  addVisibleStatus: (status: string) => void;
  removeVisibleStatus: (status: string) => void;
  addStatus: (status: string) => void;
  removeStatus: (status: string) => void;
}

interface UserStatusProviderProps {
  children: React.ReactNode; // ReactNode can be anything renderable in React (elements, strings, numbers, etc.)
}

export const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

// Provider component
export const UserStatusProvider: React.FC<UserStatusProviderProps> = ({ children }) => {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [visibleStatuses, setVisibleStatuses] = useState<string[]>([]);

  useEffect(() => {
    const storedStatuses = UserStatus.get(); // Get statuses from localStorage or default
    setStatuses(storedStatuses);
  }, []);

  useEffect(() => {
    if (statuses) {
      setVisibleStatuses(statuses)
    }
  },[statuses])

  const addStatus = (status: string) => {
    UserStatus.add(status); // Save the new status to localStorage
    setStatuses((prevStatuses) => [...prevStatuses, status]);
  };

  const removeStatus = (status: string) => {
    UserStatus.remove(status); // Remove status from localStorage
    setStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status));
  };

  const addVisibleStatus = (status: string) => {
    VisibleStatus.add(status); // Save the new status to localStorage
    setVisibleStatuses((prevStatuses) => [...prevStatuses, status]);
  };

  const removeVisibleStatus = (status: string) => {
    VisibleStatus.remove(status); // Remove status from localStorage
    setVisibleStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status));
  };

  return (
    <UserStatusContext.Provider value={{
      statuses,
      addStatus,
      removeStatus,
      visibleStatuses,
      addVisibleStatus,
      removeVisibleStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

// Custom hook to access the user statuses

