import { useReducer } from "react";

type StateType = {
  user: any;
};

type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload?: any;
};

const initialState: StateType = {
  user: null,
};

const appStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};

const useAppState = () => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  return { state, dispatch };
};

export default useAppState;
