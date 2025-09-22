import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import Cell from "./habit/Cell";
import { fetchHabits } from "../services/habits";
import { Tables } from "../types/supabase";

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

  if (loading || loadingHabits) return <p>Loading...</p>;
  if (!user) return <p>Not authorized. Please log in.</p>;

  return (
    <main className="flex flex-col items-center justify-start flex-1 w-full p-4">
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex flex-col items-center border-1 justify-center rounded-xl h-40 w-80 text-center shadow"
          >
            {habit.title}
            <p>Settings</p>
            <Cell />
          </div>
        ))}

        <button className="flex items-center justify-center h-40 w-80 border-2 border-dashed border-gray-400 rounded-xl text-gray-400 hover:bg-gray-100 transition">
          + Create New
        </button>
      </div>
    </main>
  );
};

export default Content;
