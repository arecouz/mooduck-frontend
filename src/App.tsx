import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import HomePage from './pages/Login.tsx';

const App = () => {
  return (
    <ThemeProvider>
      <div className='bg-white text-black dark:bg-black dark:text-white theme-transition'>
        <HomePage />
      </div>
    </ThemeProvider>
  );
};

export default App;
