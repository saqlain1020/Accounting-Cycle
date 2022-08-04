import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/state";
import { toggleTheme } from "src/state/settings/settingsReducer";

const useSettings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();

  return { settings, themeMode: settings.theme, toggleTheme: () => dispatch(toggleTheme()) };
};

export default useSettings;
