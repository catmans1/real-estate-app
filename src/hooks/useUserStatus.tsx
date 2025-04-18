import { useContext } from "react";
import { UserStatusContextType, UserStatusContext } from '../context'

export const useUserStatus = (): UserStatusContextType => {
  const context = useContext(UserStatusContext);
  if (!context) {
    throw new Error("useUserStatus must be used within a UserStatusProvider");
  }
  return context;
};