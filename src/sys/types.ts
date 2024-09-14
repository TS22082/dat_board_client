import { ReactNode } from "react";
import { ADD_BREADCRUMB, LOGIN, LOGOUT, REMOVE_BREADCRUMB } from "./constants";

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
};

export type ActionType = {
  type:
    | typeof LOGIN
    | typeof LOGOUT
    | typeof ADD_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof REMOVE_BREADCRUMB;
  payload: UserType | null | BreadCrumb;
};

export type AppStateProviderProps = {
  children: ReactNode;
};

export type AppStateContextType = {
  state: StateType;
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  dispatch: React.Dispatch<ActionType>;
};
