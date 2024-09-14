export type UserType = {
  Email: string;
  ID: string;
};

export type BreadCrumb = {
  label: string;
  path: string;
};

export type StateType = {
  user: UserType | null;
  breadcrumbs: BreadCrumb[];
};

export type ActionType = {
  type: "LOGIN" | "LOGOUT" | "ADD_BREADCRUMB" | "REMOVE_BREADCRUMB";
  payload: UserType | null | BreadCrumb;
};
