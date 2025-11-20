import { useState, useEffect, forwardRef, useImperativeHandle, Ref, useRef } from 'react';
import { shootFireworks } from '../utils/fireworks';
import { playChime, playNintendo, playLevelUp } from '../utils/sound';
import Cell from './habit/Cell';
import { StreakAnimationHandle, StreakAnimationProps } from '../types/streak';
import { CellValue } from '../types/cell';

const MILESTONE = 10;

const StreakAnimation = (
  { streak, baseStreak, onComplete }: StreakAnimationProps,
  ref: Ref<StreakAnimationHandle>,
) => {
  const [cells, setCells] = useState<CellValue[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const hasPlayedRef = useRef<number | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (hasPlayedRef.current !== streak) {
          hasPlayedRef.current = streak;
          setCells(baseStreak && baseStreak > 0 ? [baseStreak] : []);
          setIsPlaying(true);
          setIsCollapsing(false);
        }
      },
    }),
    [streak, baseStreak],
  );

  const startCollapse = () => {
    setIsCollapsing(true);
    shootFireworks();
    playLevelUp();
    shootFireworks();
    shootFireworks();
  };

  useEffect(() => {
    if (!isPlaying) return;

    const streakToAdd = streak - (baseStreak || 0);
    if (streakToAdd <= 0) {
      startCollapse();
      return;
    }

    const isDivisibleBy10 = streakToAdd % MILESTONE === 0;
    const completeGroups = Math.floor(streakToAdd / MILESTONE);
    const remainder = streakToAdd % MILESTONE;
    const numCompleteGroupsToAdd = Math.max(
      0,
      isDivisibleBy10 ? completeGroups - 1 : completeGroups,
    );
    const lastGroupAnimates = isDivisibleBy10 && streakToAdd > 0;

    const cellsToAdd: number[] = [
      ...Array(numCompleteGroupsToAdd).fill(MILESTONE),
      ...(remainder > 0 ? Array(remainder).fill(1) : []),
    ];

    let currentIndex = 0;

    const tick = () => {
      if (currentIndex >= cellsToAdd.length) {
        if (lastGroupAnimates) {
          animateLastGroup();
        } else {
          startCollapse();
        }
        return;
      }

      const value = cellsToAdd[currentIndex];
      setCells(prev => [...prev, value]);

      if (value === MILESTONE) {
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
        if (lastGroupIndex >= MILESTONE) {
          setTimeout(() => {
            playLevelUp();
            shootFireworks();
            playChime(440 + completeGroups * 20);
            setCells(prev => {
              const withoutLast10 = prev.slice(0, -MILESTONE);
              return [...withoutLast10, MILESTONE];
            });
            setTimeout(() => startCollapse(), 300);
          }, 100);
          return;
        }

        setCells(prev => [...prev, 1]);
        playNintendo(400 + lastGroupIndex * 30, lastGroupIndex);
        lastGroupIndex++;
        setTimeout(animateTick, 100);
      };

      animateTick();
    };

    tick();
  }, [isPlaying, streak, baseStreak]);

  useEffect(() => {
    if (!isCollapsing) return;

    const collapseDelay = 50;

    const timer = setTimeout(() => {
      setCells([streak]);
      setIsPlaying(false);
      setIsCollapsing(false);
      onComplete?.();
    }, collapseDelay);

    return () => clearTimeout(timer);
  }, [isCollapsing, streak, onComplete]);

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {!isPlaying && cells.length === 0 ? (
        <Cell toggled={true} clickable={false} value={streak} />
      ) : (
        cells.map((value, i) => (
          <Cell key={i} toggled={true} clickable={false} autoToggle={true} value={value} />
        ))
      )}
    </div>
  );
};

export default forwardRef(StreakAnimation);
