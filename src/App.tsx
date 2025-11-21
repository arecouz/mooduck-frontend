// App.tsx
import { FireworksWrapper } from './utils/FireworksWrapper';
import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Sandbox from './pages/Sandbox.tsx';
import PageNotFound from './pages/PageNotFound.tsx';

const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <FireworksWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
