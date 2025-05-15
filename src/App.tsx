import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
