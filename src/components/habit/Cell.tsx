import { useState, useEffect } from "react";

interface CellProps {
    toggled?: boolean;
    onToggle?: (state: boolean) => void;
    autoToggle?: boolean;
    clickable?: boolean;
}

const Cell = ({ toggled: controlledToggled, onToggle, autoToggle, clickable = false }: CellProps) => {
    const [toggled, setToggled] = useState(controlledToggled ?? false);
    const beep = new Audio("/beep.mp3");

    // Auto toggle
    useEffect(() => {
        if (autoToggle) {
            setToggled(true);
            beep.currentTime = 0;
            beep.play();
            onToggle?.(true);
        }
    }, [autoToggle]);

    // Sync with controlled state
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
        w-10 h-10 flex items-center justify-center border-2 rounded-lg 
        ${toggled ? "bg-yellow-300 dark:bg-violet-900 animate-bounce-once" : ""}
        ${clickable ?? "cursor-pointer hover:bg-yellow-200 dark:hover:bg-violet-800"}
      `}
        />
    );
};

export default Cell;
