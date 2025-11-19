import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

type TConductorInstance = {
    shoot: () => void;
    pause: () => void;
    stop: () => void;
};

let fireworksController: TConductorInstance | null = null;
let activeFireworks = 0;

/**
 * Shoot fireworks globally
 * @param duration duration in ms before stopping
 */
export const shootFireworks = (duration = 2000) => {
    fireworksController?.shoot();
    activeFireworks++;
    setTimeout(() => {
        activeFireworks--;
        if (activeFireworks === 0) {
            fireworksController?.stop();
        }
    }, duration);
};

/**
 * Fireworks wrapper component to put somewhere at the root of your app
 * Only needs to be rendered once
 */
export const FireworksWrapper = () => (
    <Fireworks
        onInit={(instance) => {
            fireworksController = instance.conductor ?? instance;
        }}
    />
);
