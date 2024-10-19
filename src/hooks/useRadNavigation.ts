import { useNavigate } from 'react-router-dom';
import { useAppStateContext } from '../context/useAppStateContext';
import {
  ADD_BREADCRUMB,
  REMOVE_BREADCRUMB,
  RESET_ITEMS,
} from '../sys/constants';
import { NavArgsType } from '../sys/types';

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
    dispatch({ type: RESET_ITEMS, payload: null });
    dispatch({ type: ADD_BREADCRUMB, payload: navArgs });

    return navigate(navArgs.route);
  };

  const handleBack = (): void => {
    dispatch({ type: REMOVE_BREADCRUMB, payload: null });
    return navigate(-1);
  };

  const navigateRaw = (path: string) => {
    return navigate(path);
  };

  return { handleNavigate, handleBack, navigateRaw, breadcrumbs };
};

export default useRadNavigation;
