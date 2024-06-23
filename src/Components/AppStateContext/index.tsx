import { createContext, useContext } from "react";
import useAppState from "../../hooks/useAppState";

// Define the shape of your state
type StateType = {
  user: any;
};

// Define the shape of your actions
type ActionType = {
  type: string;
  payload: any;
};

// Define the shape of your context
type AppStateContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

// Create a context for your app state
const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

// Create a custom hook that uses the context
export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppStateProvider");
  }
  return context;
};

type AppStateProviderProps = {
  children: React.ReactNode;
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
