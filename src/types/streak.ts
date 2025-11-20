export type StreakAnimationProps = {
  streak: number;
  onComplete?: () => void;
  className?: string;
};

export type StreakAnimationHandle = {
  play: () => void;
};

export type CellState = {
  value: number;
};
