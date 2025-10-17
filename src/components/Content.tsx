import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import Cell from "./habit/Cell";
import { fetchHabits } from "../services/habits";
import { Tables } from "../types/supabase";
import { shootFireworks } from "../utils/fireworks";

type Habit = Tables<"habits">;

const Content = () => {
  const { user, loading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loadingHabits, setLoadingHabits] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      if (!user) return;
      try {
        const data = await fetchHabits();
        setHabits(data);
      } catch (err) {
        console.error("Error fetching habits:", err);
      } finally {
        setLoadingHabits(false);
      }
    };

    loadHabits();
  }, [user]);

  const handleCheck = (habit: Habit, state: boolean) => {
    console.log(`Toggled habit: ${habit.title} (ID: ${habit.id}) -> ${state}`);
    shootFireworks()
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
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex flex-col items-center border-1 justify-center rounded-xl h-40 w-80 text-center shadow"
          >
            {habit.title} Steak:
            <Cell
              clickable={true}
              onToggle={(state) => handleCheck(habit, state)}
            />
          </div>
        ))}

      </div>
    </main>
  );
};

export default Content;
