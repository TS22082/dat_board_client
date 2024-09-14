import { ReactNode } from "react";
import {
  ADD_BREADCRUMB,
  LOGIN,
  LOGOUT,
  REMOVE_BREADCRUMB,
  TOGGLE_THEME,
} from "./constants";

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
  theme: "light" | "dark";
};

export type ActionType = {
  type:
    | typeof LOGIN
    | typeof LOGOUT
    | typeof ADD_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof TOGGLE_THEME;
  payload: UserType | null | BreadCrumb;
};

export type AppStateProviderProps = {
  children: ReactNode;
};

export type AppStateContextType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: "light" | "dark";
  dispatch: React.Dispatch<ActionType>;
};

export type NavArgsType = {
  label: string;
  route: string;
};
