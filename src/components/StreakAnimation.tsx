import { useState, useEffect, forwardRef, useImperativeHandle, Ref, useRef } from 'react';
import { shootFireworks } from '../utils/fireworks';
import { playChime, playNintendo, playLevelUp } from '../utils/sound';
import Cell from './habit/Cell';

type __StreakAnimationProps__ = {
  streak: number;
  onComplete?: () => void;
  className?: string;
};

export type __StreakAnimationHandle__ = {
  play: () => void;
};

const MILESTONE = 10;

type __CellState__ = {
  value: number;
};

const StreakAnimation = (
  { streak, onComplete }: __StreakAnimationProps__,
  ref: Ref<__StreakAnimationHandle__>,
) => {
  const [cells, setCells] = useState<__CellState__[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const hasPlayedRef = useRef<number | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (hasPlayedRef.current !== streak) {
          hasPlayedRef.current = streak;
          setCells([]);
          setIsPlaying(true);
          setIsCollapsing(false);
        }
      },
    }),
    [streak],
  );

  useEffect(() => {
    if (!isPlaying) return;

    const isDivisibleBy10 = streak % MILESTONE === 0;
    const completeGroups = Math.floor(streak / MILESTONE);
    const remainder = streak % MILESTONE;
    const numCompleteGroupsToAdd = isDivisibleBy10 ? completeGroups - 1 : completeGroups;
    const lastGroupAnimates = isDivisibleBy10;

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
      setCells(prev => [...prev, { value }]);

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
              return [...withoutLast10, { value: MILESTONE }];
            });
            setTimeout(() => startCollapse(), 300);
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

    const startCollapse = () => {
      shootFireworks();
      playLevelUp();
      shootFireworks();
      setIsCollapsing(true);
      shootFireworks();
    };

    tick();
  }, [isPlaying, streak]);

  useEffect(() => {
    if (!isCollapsing) return;

    const collapseDelay = 500;

    const timer = setTimeout(() => {
      setCells([{ value: streak }]);
      setIsPlaying(false);
      setIsCollapsing(false);
      onComplete?.();
    }, collapseDelay);

    return () => clearTimeout(timer);
  }, [isCollapsing, streak, onComplete]);

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {cells.map((cell, i) => (
        <Cell key={i} toggled={true} clickable={false} autoToggle={true} value={cell.value} />
      ))}
    </div>
  );
};

export default forwardRef(StreakAnimation);
