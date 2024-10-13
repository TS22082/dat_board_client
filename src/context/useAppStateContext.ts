import { createContext, useContext } from "react";
import { AppStateContextType } from "../sys/types";

export const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

/**
 * A hook that returns the current app state.
 *
 * This hook uses the `useContext` hook to get the current app state from the
 * `AppStateContext`. If the context is not found, it throws an error.
 *
 * @returns The current app state.
 */
export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "useAppStateContext must be used within an AppStateProvider"
    );
  }
  return context;
};
