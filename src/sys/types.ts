import { ReactNode } from "react";
import {
  ADD_BREADCRUMB,
  ADD_ITEM,
  CLOSE_MODAL,
  DELETE_ITEM_BY_ID,
  LOGIN,
  LOGOUT,
  OPEN_MODAL,
  REMOVE_BREADCRUMB,
  SET_ITEMS,
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
  items: ItemType[];
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
    | typeof OPEN_MODAL
    | typeof SET_ITEMS
    | typeof DELETE_ITEM_BY_ID
    | typeof ADD_ITEM;
  payload:
    | null
    | UserType
    | BreadCrumb
    | ModalDataType
    | ItemType[]
    | string
    | ItemType;
};

export type AppStateProviderProps = {
  children: ReactNode;
};

export type AppStateContextType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
  theme: "light" | "dark";
  modalData: ModalDataType | null;
  items: ItemType[];
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
