import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "./useAppStateContext";
import {
  ADD_BREADCRUMB,
  REMOVE_BREADCRUMB,
  RESET_ITEMS,
} from "../sys/constants";
import { NavArgsType } from "../sys/types";

/**
 * A hook that provides navigation functionality to the app.
 *
 * This hook uses the `useAppStateContext` hook to get the current app state,
 * and the `useNavigate` hook from `react-router-dom` to navigate to new
 * locations.
 *
 * The hook returns an object with three properties:
 *   - `handleNavigate`: A function that takes a `NavArgsType` object as its
 *     argument, and navigates to the route specified in the object, adding a
 *     breadcrumb to the app state if the breadcrumb doesn't already exist.
 *   - `handleBack`: A function that removes the last breadcrumb from the app
 *     state, and navigates back to the previous page.
 *   - `breadcrumbs`: The current breadcrumbs in the app state.
 *
 * @returns An object with `handleNavigate`, `handleBack`, and `breadcrumbs`
 *          properties.
 */
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
