import React, { createContext, useContext } from "react";
import { ActionType, StateType } from "../types";

type AppStateContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

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
