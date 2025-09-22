import { useAuth } from '../context/auth/useAuth';
import Cell from './habit/Cell';
import { MoodOutOfFive } from './MoodOutOfFive';

const Content = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;

  const habits = ['Habit One', 'Habit Two', 'Habit Three']; // Example habits

  return (
    <main className="flex flex-col items-center justify-start flex-1 w-full p-4">
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        {habits.map((habit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-200 rounded-xl h-40 w-40 text-center shadow"
          >
            {habit}
            <p>Settings</p>
          </div>
        ))}

        {/* Dashed "Create New" card */}
        <button className="flex items-center justify-center h-40 w-40 border-2 border-dashed border-gray-400 rounded-xl text-gray-400 hover:bg-gray-100 transition">
          + Create New
        </button>
      </div>
    </main>
  );
};

export default Content;
