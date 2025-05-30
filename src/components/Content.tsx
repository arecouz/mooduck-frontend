import { useAuth } from '../context/auth/useAuth';
import { MoodOutOfFive } from './MoodOutOfFive';

const Content = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;
  return (
    <main className="flex flex-col items-center justify-center flex-1">
      <MoodOutOfFive />
    </main>
  );
};

export default Content;
