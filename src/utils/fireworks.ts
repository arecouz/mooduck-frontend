type TConductorInstance = {
    shoot: () => void;
    pause: () => void;
    stop: () => void;
};

let fireworksController: TConductorInstance | null = null;
let activeFireworks = 0;

export const setFireworksController = (instance: TConductorInstance | null) => {
    fireworksController = instance;
};

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
