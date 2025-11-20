// pages/dev-streak.tsx
import { useRef, useState } from 'react';
import StreakAnimation from '../components/StreakAnimation';
import { StreakAnimationHandle } from '../types/streak';

const Sandbox = () => {
  const [streak, setStreak] = useState(12);
  const streakRef = useRef<StreakAnimationHandle>(null);

  const handleTriggerAnimation = () => {
    streakRef.current?.play();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dev Playground: StreakAnimation</h1>

      {/* Simple control for streak */}
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium">Current streak:</label>
        <input
          type="number"
          min={1}
          value={streak}
          onChange={e => setStreak(Number(e.target.value))}
          className="border px-2 py-1 rounded w-24"
        />
      </div>

      {/* Button to trigger the animation */}
      <button onClick={handleTriggerAnimation} className="px-4 py-2 bg-blue-600 text-white rounded">
        Show Streak Animation
      </button>

      {/* The StreakAnimation component */}
      <div className="mt-6">
        <StreakAnimation streak={streak} ref={streakRef} />
      </div>
    </div>
  );
};

export default Sandbox;
