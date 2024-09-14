import { ReactNode, useReducer } from "react";
import { AppStateContext } from "../../hooks/useAppStateContext";
import { ActionType, StateType, UserType } from "../../types";

const initialState: StateType = {
  user: null,
  breadcrumbs: [],
};

// Define the reducer function
const appStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload as UserType };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
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
