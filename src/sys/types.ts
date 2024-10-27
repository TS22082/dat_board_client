import { ReactNode } from 'react';
import {
  ADD_BREADCRUMB,
  ADD_ITEM,
  DELETE_ITEM_BY_ID,
  LOGIN,
  LOGOUT,
  REMOVE_BREADCRUMB,
  RESET_ITEMS,
  SET_BREAKPOINT,
  SET_ITEMS,
  TOGGLE_THEME,
} from './constants';

export type Route = {
  path: string;
  element: ReactNode;
};

export type UserType = {
  Email: string;
  ID: string;
};

export type BreadCrumb = {
  label: string;
  route: string;
};

export type StateType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: 'light' | 'dark';
  items: ItemType[];
  screenSize: string;
};

export type ActionType = {
  type:
    | typeof LOGIN
    | typeof LOGOUT
    | typeof ADD_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof TOGGLE_THEME
    | typeof SET_ITEMS
    | typeof DELETE_ITEM_BY_ID
    | typeof ADD_ITEM
    | typeof RESET_ITEMS
    | typeof SET_BREAKPOINT;
  payload: null | UserType | BreadCrumb | ItemType[] | string | ItemType;
};

export type AppStateProviderProps = {
  children: ReactNode;
};

export type AppStateContextType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: 'light' | 'dark';
  items: ItemType[];
  screenSize: string;
  dispatch: React.Dispatch<ActionType>;
};

export type NavArgsType = {
  label: string;
  route: string;
};

export type ItemType = {
  id: string;
  title: string;
  parentId: string;
  isPublic: boolean;
};

export type ItemCardProps = {
  item: ItemType;
};

export type ButtonProps = {
  width?: string;
};
