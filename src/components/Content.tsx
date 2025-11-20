import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/auth/useAuth';
import Cell from './habit/Cell';
import { fetchHabits, removeHabit } from '../services/habits';
import { Tables } from '../types/supabase';
import { shootFireworks } from '../utils/fireworks';
import StreakAnimation from './StreakAnimation';

type Habit = Tables<'habits'>;

const Content = () => {
  const { user, loading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(true);
  const streakRef = useRef(null);

  useEffect(() => {
    const loadHabits = async () => {
      if (!user) return;
      try {
        const data = await fetchHabits();
        setHabits(data);
      } catch (err) {
        console.error('Error fetching habits:', err);
      } finally {
        setLoadingHabits(false);
      }
    };

    loadHabits();
  }, [user]);

  const handleCheck = (habit: Habit, state: boolean) => {
    console.log(`Toggled habit: ${habit.title} (ID: ${habit.id}) -> ${state}`);
    shootFireworks();
  };

  if (loading || loadingHabits) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;

  return (
    <main className="flex flex-col items-center justify-start flex-1">
      <div className="flex flex-col items-center justify-center h-20 w-100 text-gray-400 ">
        <h1>Todays Habits</h1>
        <p></p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        {habits.map(habit => (
          <div
            key={habit.id}
            className="flex flex-col items-center border-1 justify-center rounded-xl h-40 w-80 text-center shadow"
          >
            {habit.title}
            <button
              onClick={() => {
                removeHabit(habit.id);
              }}
            >
              delete
            </button>
            <button onClick={() => streakRef.current?.play()}>completed</button>
            <Cell clickable={true} onToggle={state => handleCheck(habit, state)} />
            <StreakAnimation streak={9} ref={streakRef} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Content;
