import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import Layout from './Layout.tsx';


const App = () => {
  return (
    <ThemeProvider>
      <div className='bg-yellow-50 text-black dark:bg-gray-900 dark:text-yellow-100 theme-transition text-fluid'>
        <Layout />
      </div>
    </ThemeProvider>
  );
};

export default App;
