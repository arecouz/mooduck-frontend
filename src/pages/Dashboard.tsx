import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import Layout from '../Layout';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    navigate('/login');
  }

  return <Layout />;
};

export default Dashboard;
