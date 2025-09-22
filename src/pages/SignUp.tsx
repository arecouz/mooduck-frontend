import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Cell from "../components/habit/Cell";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/auth/useAuth";
import { createHabit } from "../services/habits";

type TConductorInstance = {
    shoot: () => void;
    run: (params?: any) => void;
    pause: () => void;
    stop: () => void;
};

const SignUp = () => {
    const { user } = useAuth();
    const [firstHabitCreated, setFirstHabitCreated] = useState(false);
    const [loading, setLoading] = useState(false); // optional loading state
    const [habitName, setHabitName] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    const fireworksController = useRef<TConductorInstance | null>(null);
    const navigate = useNavigate();

    const handleFireworksInit = (instance: any) => {
        fireworksController.current = instance.conductor ?? instance;
    };

    const handleCreateHabit = async () => {
        if (!user) return;
        setLoading(true);

        try {
            await createHabit({
                title: habitName,
                description: habitDescription,
                frequency: "daily", // or "weekly"
                start_date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
                user_id: user.id,
                tags: ["test"], // optional
                goal: null, // optional
                custom_days: null, // optional
            });

            setFirstHabitCreated(true);

            // Fire a single burst
            fireworksController.current?.shoot();
            setTimeout(() => fireworksController.current?.stop(), 1000);
        } catch (error) {
            console.error("Failed to create habit:", error);
        } finally {
            setLoading(false);
        }
    };

    const goToDashboard = () => navigate("/dashboard");

    const userSignedUp = !!user;

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Fireworks onInit={handleFireworksInit} />

            <div className="flex flex-row space-x-8 mb-8">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">1. Sign Up</p>
                    <Cell toggled={userSignedUp} clickable={false} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">2. Add your habit</p>
                    <Cell toggled={firstHabitCreated} clickable={false} />
                </div>
            </div>

            <div className="w-full max-w-md rounded-xl p-6 flex flex-col items-center bg-slate-900/80 shadow-lg">
                {!userSignedUp ? (
                    <AuthForm mode="signup" />
                ) : !firstHabitCreated ? (
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="habitName" className="font-semibold">
                                Habit Name:
                            </label>
                            <input
                                id="habitName"
                                type="text"
                                className="w-full border-2 px-3 py-2 rounded"
                                required
                                value={habitName}
                                onChange={(e) => setHabitName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="habitDescription" className="font-semibold">
                                Habit Description:
                            </label>
                            <textarea
                                id="habitDescription"
                                rows={2}
                                className="w-full border-2 px-3 py-2 rounded resize-none"
                                value={habitDescription}
                                onChange={(e) => setHabitDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleCreateHabit}
                            disabled={loading || !habitName}
                            className="mt-2 px-4 py-2 bg-yellow-300 rounded hover:bg-yellow-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                            {loading ? "Creating..." : "Submit Habit"}
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl font-bold mb-4 text-green-400">
                            🎉 Congratulations! 🎉
                        </p>
                        <button
                            onClick={goToDashboard}
                            className="px-6 py-3 bg-yellow-300 rounded hover:bg-yellow-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
