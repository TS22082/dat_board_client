import React, { ReactNode } from 'react';
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

export type AppContainerProps = {
  theme: 'light' | 'dark';
  children: JSX.Element;
};

export type GridPropTypes = {
  children: React.ReactNode;
};

export type CardContainerProps = {
  children: ReactNode;
  theme: 'light' | 'dark';
};

export type NavAreaProps = {
  theme: 'light' | 'dark';
};

export type ToggelCircleProps = {
  theme: 'light' | 'dark';
  isOn: boolean;
};

export type TooltipType = {
  text: string;
  position: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
  theme: 'light' | 'dark';
};

export type ToopTipTextProps = {
  position: 'up' | 'down' | 'left' | 'right';
  theme: 'light' | 'dark';
};

export type ToggleSwitchProps = {
  theme: 'light' | 'dark';
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type RequestTypes = 'GET' | 'POST' | 'DELETE' | 'PUT';
