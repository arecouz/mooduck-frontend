import { useAuth } from '../context/auth/useAuth';
import Layout from '../Layout';

const Dashboard = () => {
  const { session, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  console.log(session)
  if (!user) return <p>Not authorized. Please log in.</p>;

  return <Layout />;
};

export default Dashboard;
