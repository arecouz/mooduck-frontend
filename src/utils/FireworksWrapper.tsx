import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { setFireworksController } from "./fireworks";

export const FireworksWrapper = () => (
    <Fireworks
        onInit={(instance) => {
            setFireworksController(instance.conductor ?? instance);
        }}
    />
);
