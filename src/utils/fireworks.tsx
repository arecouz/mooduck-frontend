import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

type TConductorInstance = {
    shoot: () => void;
    pause: () => void;
    stop: () => void;
};

let fireworksController: TConductorInstance | null = null;

/**
 * Shoot fireworks globally
 * @param duration duration in ms before stopping
 */
export const shootFireworks = (duration = 1000) => {
    fireworksController?.shoot();
    setTimeout(() => fireworksController?.stop(), duration);
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
