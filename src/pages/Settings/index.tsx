import Switch from '../../Components/Switch';
import { useAppStateContext } from '../../context/useAppStateContext.ts';
import { TOGGLE_THEME } from '../../sys/constants.ts';

const Settings = () => {
  const { theme, dispatch } = useAppStateContext();

  return (
    <div>
      <h1>Light / Dark mode</h1>
      <Switch
        isOn={theme !== 'light'}
        handleToggle={() => dispatch({ type: TOGGLE_THEME, payload: null })}
        label={['Light', 'Dark']}
      />
    </div>
  );
};

export default Settings;
