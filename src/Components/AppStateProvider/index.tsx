import { useReducer } from "react";
import { AppStateContext } from "../../hooks/useAppStateContext";
import {
  ActionType,
  AppStateProviderProps,
  StateType,
  UserType,
} from "../../sys/types";
import { LOGIN, LOGOUT } from "../../sys/constants";

const initialState: StateType = {
  user: null,
  breadcrumbs: [],
};

// Define the reducer function
const appStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload as UserType };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};

// Create a provider component that uses the useReducer hook
const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider
      value={{
        state,
        user: state.user,
        breadcrumbs: state.breadcrumbs,
        dispatch,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
