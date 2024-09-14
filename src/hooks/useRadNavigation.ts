import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "./useAppStateContext";
import { ADD_BREADCRUMB, REMOVE_BREADCRUMB } from "../sys/constants";

const useRadNavigation = () => {
  const navigate = useNavigate();
  const { breadcrumbs, dispatch } = useAppStateContext();

  const handleNavigate = (label: string, route: string) => {
    dispatch({ type: ADD_BREADCRUMB, payload: { label, route } });
    navigate(route);
  };

  const handleBack = () => {
    dispatch({ type: REMOVE_BREADCRUMB, payload: null });
    navigate(-1);
  };

  return { handleNavigate, handleBack, breadcrumbs };
};

export default useRadNavigation;
