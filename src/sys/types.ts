import { ReactNode } from "react";
import {
  ADD_BREADCRUMB,
  CLOSE_MODAL,
  LOGIN,
  LOGOUT,
  OPEN_MODAL,
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

export type DeleteItemModalData = {
  id: string;
  title: string;
};

export type ModalDataType = {
  type: string;
  data: DeleteItemModalData | null | undefined;
};

export type StateType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: "light" | "dark";
  modalData: ModalDataType | null;
};

export type ActionType = {
  type:
    | typeof LOGIN
    | typeof LOGOUT
    | typeof ADD_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof REMOVE_BREADCRUMB
    | typeof TOGGLE_THEME
    | typeof CLOSE_MODAL
    | typeof OPEN_MODAL;
  payload: null | UserType | BreadCrumb | ModalDataType;
};

export type AppStateProviderProps = {
  children: ReactNode;
};

export type AppStateContextType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: "light" | "dark";
  modalData: ModalDataType | null;
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
