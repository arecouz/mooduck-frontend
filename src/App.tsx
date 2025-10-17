// App.tsx
import { FireworksWrapper } from './utils/fireworks.tsx';
import { ThemeProvider } from './context/theme/ThemeProvider.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Dashboard from './pages/Dashboard.tsx';

const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <FireworksWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
