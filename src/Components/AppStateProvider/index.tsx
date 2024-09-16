import { useReducer } from "react";
import { AppStateContext } from "../../hooks/useAppStateContext";
import {
  ActionType,
  AppStateProviderProps,
  BreadCrumb,
  ModalDataType,
  StateType,
  UserType,
} from "../../sys/types";
import {
  ADD_BREADCRUMB,
  CLOSE_MODAL,
  LOGIN,
  LOGOUT,
  OPEN_MODAL,
  TOGGLE_THEME,
} from "../../sys/constants";

const initialState: StateType = {
  user: null,
  breadcrumbs: JSON.parse(localStorage.getItem("breadcrumbs") as string) || [],
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  modalData: null,
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
      localStorage.setItem(
        "breadcrumbs",
        JSON.stringify([...state.breadcrumbs, action.payload as BreadCrumb])
      );
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload as BreadCrumb],
      };
    case TOGGLE_THEME:
      localStorage.setItem("theme", state.theme === "light" ? "dark" : "light");
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case CLOSE_MODAL: {
      return { ...state, modalData: null };
    }
    case OPEN_MODAL: {
      return { ...state, modalData: action.payload as ModalDataType };
    }
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
        modalData: state.modalData,
        dispatch,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
