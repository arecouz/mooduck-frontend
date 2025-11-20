import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/auth/useAuth';
import Cell from './habit/Cell';
import {
  fetchHabits,
  getHabitsDoneToday,
  Habit,
  logHabit,
  removeHabit,
} from '../services/habits';
import { shootFireworks } from '../utils/fireworks';
import StreakAnimation from './StreakAnimation';
import { StreakAnimationHandle } from '../types/streak';

const Content = () => {
  const { user, loading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(true);
  const [totalStreak, setTotalStreak] = useState(0);
  const [baseStreak, setBaseStreak] = useState(0);
  const [checkedHabits, setCheckedHabits] = useState(new Set<string>());
  const streakRef = useRef<StreakAnimationHandle | null>(null);
  const [timeTillMidnight, setTimeTillMidnight] = useState('');

  useEffect(() => {
    const loadHabits = async () => {
      if (!user) return;

      try {
        const habitsData = await fetchHabits();
        setHabits(habitsData);

        // get all habits completed today
        const doneTodaySet = await getHabitsDoneToday();
        setCheckedHabits(doneTodaySet);

        // calculate the total score for habits
        const sumOfStreaks = habitsData.reduce(
          (sum, habit) => sum + habit.streak,
          0,
        );
        const initialTotal = sumOfStreaks + doneTodaySet.size;

        console.log(doneTodaySet);
        console.log(initialTotal);
        setTotalStreak(initialTotal);
        setBaseStreak(initialTotal); // important for the animation trigger
        console.log('Initial total streak:', initialTotal);
      } catch (err) {
        console.error('Error fetching habits or checking logs:', err);
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

  useEffect(() => {
    const calculateTimeTillMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timerId = setInterval(() => {
      setTimeTillMidnight(calculateTimeTillMidnight());
    }, 1000);

    // Initial calculation
    setTimeTillMidnight(calculateTimeTillMidnight());

    return () => clearInterval(timerId);
  }, []);

  const handleCheck = async (habit: Habit, state: boolean) => {
    if (!state || checkedHabits.has(habit.id)) return;

    try {
      const updatedHabit = await logHabit(habit);
      console.log('Updated habit:', updatedHabit);

      setCheckedHabits(prev => new Set(prev).add(habit.id));
      shootFireworks();

      // Update baseStreak first
      setBaseStreak(totalStreak);

      // Increment totalStreak by 1
      setTotalStreak(prev => prev + 1);
    } catch (err) {
      console.error('Error logging habit:', err);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await removeHabit(habitId);

      const newHabits = habits.filter(habit => habit.id !== habitId);
      setHabits(newHabits);

      const newCheckedHabits = new Set(checkedHabits);
      newCheckedHabits.delete(habitId);
      setCheckedHabits(newCheckedHabits);

      // Recalculate total streak
      const sumOfStreaks = newHabits.reduce((sum, habit) => sum + habit.streak, 0);
      const newTotal = sumOfStreaks + newCheckedHabits.size;
      setTotalStreak(newTotal);
      setBaseStreak(newTotal);
    } catch (err) {
      console.error('Error deleting habit:', err);
    }
  };

  if (loading || loadingHabits) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;

  const allHabitsDone = habits.length > 0 && checkedHabits.size === habits.length;

  return (
    <main className="flex flex-col items-center justify-start flex-1 min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">Today's Habits</h1>
        <ul className="space-y-4">
          {habits.map(habit => (
            <li key={habit.id} className="flex items-center space-x-3 p-3 border-b-1">
              <Cell
                clickable={!checkedHabits.has(habit.id)}
                onToggle={state => handleCheck(habit, state)}
                toggled={checkedHabits.has(habit.id)}
                value={checkedHabits.has(habit.id) ? habit.streak + 1 : habit.streak}
              />
              <span className="font-semibold text-lg flex-grow">{habit.title}</span>
              <button
                onClick={() => handleDeleteHabit(habit.id)}
                className="text-red-500 font-bold px-2"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-2xl my-8 text-center">
        {allHabitsDone ? (
          <p className="text-2xl font-bold text-green-500">
            You completed everything for today!
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Time until day ends:</h2>
            <p className="text-2xl font-mono">{timeTillMidnight}</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-bold text-center mb-4">TOTAL HABIT SCORE:</h2>
        <div className="flex items-center justify-center">
          <StreakAnimation streak={totalStreak} baseStreak={baseStreak} ref={streakRef} />
        </div>
      </div>
    </main>
  );
};

export default Content;
