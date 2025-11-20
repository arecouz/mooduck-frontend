import { useState, useEffect, useMemo } from 'react';
import { CellProps } from '../../types/cell';

const Cell = ({
  value,
  toggled: controlledToggled,
  onToggle,
  autoToggle,
  clickable = false,
}: CellProps) => {
  const [toggled, setToggled] = useState(controlledToggled ?? false);

  const beep = useMemo(() => new Audio('/beep.mp3'), []);

  // Auto toggle effect
  useEffect(() => {
    if (autoToggle) {
      setToggled(true);
      beep.currentTime = 0;
      beep.play();
      onToggle?.(true);
    }
  }, [autoToggle, beep, onToggle]);

  // Sync with parent
  useEffect(() => {
    if (controlledToggled !== undefined) {
      setToggled(controlledToggled);
    }
  }, [controlledToggled]);

  const handleClick = () => {
    if (!clickable) return;
    const newState = !toggled;
    setToggled(newState);
    beep.currentTime = 0;
    beep.play();
    onToggle?.(newState);
  };

  return (
    <div
      onClick={clickable ? handleClick : undefined}
      className={`
        w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold
        ${toggled ? 'bg-yellow-300 dark:bg-violet-900 animate-bounce-once' : ''}
        ${clickable ? 'cursor-pointer hover:opacity-80' : ''}
        ${toggled ? 'animate-bounce-once' : ''}
      `}
    >
      {value}
    </div>
  );
};

export default Cell;
