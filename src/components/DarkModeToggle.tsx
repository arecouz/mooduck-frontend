import { useTheme } from '../context/theme/useTheme';

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme === 'dark' ? 'light' : 'dark'}</button>;
};
