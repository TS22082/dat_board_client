import { useReducer } from "react";

const useAppState = () => {
  const initialState = {
    user: null,
  };

  type StateType = {
    user: any;
  };

  type ActionType = {
    type: string;
    payload: any;
  };

  const appStateReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return { state, dispatch };
};

export default useAppState;
