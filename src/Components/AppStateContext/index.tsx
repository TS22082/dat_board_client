import React, { createContext, useContext, ReactNode, useReducer } from "react";

// Define the shape of your context state
type StateType = {
  user: any;
};

type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload?: any;
};

const initialState: StateType = {
  user: null,
};

// Define the reducer function
const appStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};

// Create a context for your app state
type AppStateContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

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

// Create a provider component that uses the useReducer hook
const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
