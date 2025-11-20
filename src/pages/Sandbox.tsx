import { useState, useEffect, useRef } from 'react';
import Cell from '../components/habit/Cell';
import { playNintendo, playChime, playLevelUp } from '../utils/sound';
import { shootFireworks } from '../utils/fireworks'; // import your fireworks function
import StreakAnimation from '../components/StreakAnimation';

const milestone = 10;

type CellState = {
  value: number;
};

const Sandbox = () => {
  const [streakLength, setStreakLength] = useState(25);
  const [cells, setCells] = useState<CellState[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const streakRef = useRef(null);

  const handleStart = () => {
    setCells([]);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setCells([]);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const isDivisibleBy10 = streakLength % milestone === 0;
    const completeGroups = Math.floor(streakLength / milestone);
    const remainder = streakLength % milestone;

    // If divisible by 10, the last group animates; otherwise add remainder as singles
    const numCompleteGroupsToAdd = isDivisibleBy10 ? completeGroups - 1 : completeGroups;
    const lastGroupAnimates = isDivisibleBy10;

    let cellsToAdd: number[] = [
      ...Array(numCompleteGroupsToAdd).fill(milestone),
      ...(remainder > 0 ? Array(remainder).fill(1) : []),
    ];

    let currentIndex = 0;

    const tick = () => {
      if (currentIndex >= cellsToAdd.length) {
        // All cells added, now handle the last group if divisible by 10
        if (lastGroupAnimates) {
          animateLastGroup();
        } else {
          setIsPlaying(false);
        }
        return;
      }

      const value = cellsToAdd[currentIndex];
      setCells(prev => [...prev, { value }]);

      if (value === milestone) {
        playChime(440 + currentIndex * 20);
        shootFireworks();
        setTimeout(tick, 300);
      } else {
        playNintendo(400 + currentIndex * 30, currentIndex);
        setTimeout(tick, 100);
      }

      currentIndex++;
    };

    const animateLastGroup = () => {
      let lastGroupIndex = 0;

      const animateTick = () => {
        if (lastGroupIndex >= milestone) {
          // All 10 singles added, now trigger level-up
          setTimeout(() => {
            playLevelUp();
            shootFireworks();
            playChime(440 + completeGroups * 20);

            setCells(prev => {
              // Replace the last 10 cells with a single milestone cell
              const withoutLast10 = prev.slice(0, -milestone);
              return [...withoutLast10, { value: milestone }];
            });

            setIsPlaying(false);
          }, 100);
          return;
        }

        setCells(prev => [...prev, { value: 1 }]);
        playNintendo(400 + lastGroupIndex * 30, lastGroupIndex);
        lastGroupIndex++;
        setTimeout(animateTick, 100);
      };

      animateTick();
    };

    tick();
  }, [isPlaying, streakLength]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Sandbox: Aggregated Streak Cells</h1>
      {/* Controls */}
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm mb-1">Streak Length</label>
          <input
            type="number"
            min={1}
            value={streakLength}
            onChange={e => setStreakLength(Number(e.target.value))}
            className="border px-2 py-1 rounded w-28"
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={handleStart} className="px-4 py-2 bg-blue-600 text-white rounded">
          Show Streak
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
      {/* Cells */}
      <div className="flex flex-wrap gap-2 mt-6">
        {cells.map((cell, i) => (
          <Cell key={i} toggled={true} clickable={false} autoToggle={true} value={cell.value} />
        ))}
      </div>

      <div className="border">
        <div className="p-5">
          streak 33: <StreakAnimation streak={33} ref={streakRef} />
          <button onClick={() => streakRef.current?.play()}>completed</button>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
