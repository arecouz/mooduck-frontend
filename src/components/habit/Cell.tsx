import { useState } from "react";

const Cell = () => {
    const [toggled, setToggled] = useState(false);

    const beep = new Audio("/beep.mp3");

    const handleClick = () => {
        setToggled(!toggled);
        beep.currentTime = 0;
        beep.play();
    };

    return (
        <div
            onClick={handleClick}
            className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg cursor-pointer 
        ${toggled ? "bg-yellow-300 dark:bg-violet-900 animate-bounce-once" : ""}`}
        />
    );
};

export default Cell;
