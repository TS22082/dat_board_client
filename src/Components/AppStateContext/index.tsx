import React, { createContext, useContext, ReactNode } from "react";
import useAppState from "../../hooks/useAppState";

// Define the shape of your context
type AppStateContextType = {
  state: {
    user: any;
  };
  dispatch: React.Dispatch<{
    type: "LOGIN" | "LOGOUT";
    payload?: any;
  }>;
};

// Create a context for your app state
const AppStateContext = createContext<AppStateContextType | undefined>(
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

type AppStateProviderProps = {
  children: ReactNode;
};

// Create a provider component that uses your useAppState hook
const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const { state, dispatch } = useAppState();

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
