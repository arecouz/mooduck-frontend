import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/auth/useAuth';
import Cell from './habit/Cell';
import { fetchHabits, Habit as OriginalHabit } from '../services/habits';
import { shootFireworks } from '../utils/fireworks';
import StreakAnimation from './StreakAnimation';
import { StreakAnimationHandle } from '../types/streak';

type HabitWithStreak = OriginalHabit & { streak: number };

const Content = () => {
  const { user, loading } = useAuth();
  const [habits, setHabits] = useState<HabitWithStreak[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(true);
  const [totalStreak, setTotalStreak] = useState(0);
  const [baseStreak, setBaseStreak] = useState(0);
  const [checkedHabits, setCheckedHabits] = useState(new Set<string>());
  const streakRef = useRef<StreakAnimationHandle | null>(null);

  useEffect(() => {
    const loadHabits = async () => {
      if (!user) return;
      try {
        const data = await fetchHabits();
        const habitsWithStreaks: HabitWithStreak[] = data.map((habit, index) => ({
          ...habit,
          streak: [56, 55, 70][index] || 2,
        }));
        setHabits(habitsWithStreaks);
      } catch (err) {
        console.error('Error fetching habits:', err);
      } finally {
        setLoadingHabits(false);
      }
    };

    loadHabits();
  }, [user]);

  useEffect(() => {
    if (totalStreak > baseStreak) {
      streakRef.current?.play();
    }
  }, [totalStreak, baseStreak]);

  const handleCheck = (habit: HabitWithStreak, state: boolean) => {
    if (state && !checkedHabits.has(habit.id)) {
      setCheckedHabits(prev => new Set(prev).add(habit.id));
      console.log(`Toggled habit: ${habit.title} (ID: ${habit.id}) -> ${state}`);
      shootFireworks();
      setBaseStreak(totalStreak);
      setTotalStreak(prevStreak => prevStreak + habit.streak + 1);
    }
  };

  if (loading || loadingHabits) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;

  return (
    <main className="flex flex-col items-center justify-start flex-1 min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">Today's Habits</h1>
        <ul className="space-y-4">
          {habits.map(habit => (
            <li
              key={habit.id}
              className="flex items-center space-x-3 p-3 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <Cell
                clickable={!checkedHabits.has(habit.id)}
                onToggle={state => handleCheck(habit, state)}
                toggled={checkedHabits.has(habit.id)}
                value={
                  checkedHabits.has(habit.id)
                    ? habit.streak + 1
                    : habit.streak
                }
              />
              <span className="font-semibold text-lg">{habit.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-bold text-center mb-4">TOTAL HABIT SCORE:</h2>
        <div className="flex items-center justify-center">
          <StreakAnimation
            streak={totalStreak}
            baseStreak={baseStreak}
            ref={streakRef}
          />
        </div>
      </div>
    </main>
  );
};

export default Content;
