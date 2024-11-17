import { useReducer } from 'react';
import { AppStateContext } from '../useAppStateContext';
import {
  ActionType,
  AppStateProviderProps,
  BreadCrumb,
  ItemType,
  StateType,
  UserType,
} from '../../sys/types';
import {
  ADD_BREADCRUMB,
  ADD_ITEM,
  DELETE_ITEM_BY_ID,
  LOGIN,
  LOGOUT,
  RESET_ITEMS,
  SET_BREAKPOINT,
  SET_ITEMS,
  TOGGLE_THEME,
} from '../../sys/constants';

const initialState: StateType = {
  user: null,
  breadcrumbs: JSON.parse(localStorage.getItem('breadcrumbs') as string) || [],
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  items: [],
  screenSize: 'md',
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
        'breadcrumbs',
        JSON.stringify([...state.breadcrumbs, action.payload as BreadCrumb])
      );
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload as BreadCrumb],
      };
    case TOGGLE_THEME:
      localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light');

      document.body.style.backgroundColor =
        state.theme === 'dark' ? 'black' : 'white';

      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case SET_ITEMS: {
      return { ...state, items: action.payload as ItemType[] };
    }
    case DELETE_ITEM_BY_ID: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case ADD_ITEM: {
      return { ...state, items: [...state.items, action.payload as ItemType] };
    }
    case RESET_ITEMS:
      return { ...state, items: [] };

    case SET_BREAKPOINT: {
      return { ...state, screenSize: action.payload as string };
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
        items: state.items,
        screenSize: state.screenSize,
        dispatch,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
