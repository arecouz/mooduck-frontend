import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import Layout from '../Layout';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // prevent flashing

  return <Layout />;
};

export default Dashboard;
