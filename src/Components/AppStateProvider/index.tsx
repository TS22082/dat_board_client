import { useReducer } from "react";
import { AppStateContext } from "../../hooks/useAppStateContext";
import {
  ActionType,
  AppStateProviderProps,
  BreadCrumb,
  StateType,
  UserType,
} from "../../sys/types";
import {
  ADD_BREADCRUMB,
  LOGIN,
  LOGOUT,
  TOGGLE_THEME,
} from "../../sys/constants";

const initialState: StateType = {
  user: null,
  breadcrumbs: [],
  theme: "light",
};

// Define the reducer function
const appStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload as UserType };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    case ADD_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload as BreadCrumb],
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
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
        theme: state.theme,
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
