import { createContext, useContext } from "react";
import { AppStateContextType } from "../sys/types";

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

// Create a custom hook that uses the context
export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "useAppStateContext must be used within an AppStateProvider"
    );
  }
  return context;
};
