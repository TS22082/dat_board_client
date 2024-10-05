import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "./useAppStateContext";
import {
  ADD_BREADCRUMB,
  REMOVE_BREADCRUMB,
  RESET_ITEMS,
} from "../sys/constants";
import { NavArgsType } from "../sys/types";

const useRadNavigation = () => {
  const navigate = useNavigate();
  const { breadcrumbs, dispatch } = useAppStateContext();

  const handleNavigate = (navArgs: NavArgsType): void => {
    // check to see if the breadcrumb already exists in array
    dispatch({ type: RESET_ITEMS, payload: null });

    if (breadcrumbs.some((crumb) => crumb.label === navArgs.label)) {
      return navigate(navArgs.route);
    }

    dispatch({ type: ADD_BREADCRUMB, payload: navArgs });

    return navigate(navArgs.route);
  };

  const handleBack = (): void => {
    dispatch({ type: REMOVE_BREADCRUMB, payload: null });
    return navigate(-1);
  };

  return { handleNavigate, handleBack, breadcrumbs };
};

export default useRadNavigation;
