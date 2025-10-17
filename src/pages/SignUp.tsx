import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cell from "../components/habit/Cell";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/auth/useAuth";
import { createHabit } from "../services/habits";
import { shootFireworks } from "../utils/fireworks";

const SignUp = () => {
    const { user } = useAuth();
    const [firstHabitCreated, setFirstHabitCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const navigate = useNavigate();

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayMap: Record<string, string> = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
    };

    const formatFrequency = (days: string[]): string => {
        const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const weekend = ["Sat", "Sun"];
        const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        // Sort input for consistent output
        const sortedDays = days.filter(d => allDays.includes(d));

        if (sortedDays.length === 7) return "every day!";
        if (sortedDays.length === 5 && weekdays.every(d => sortedDays.includes(d))) return "on weekdays.";
        if (sortedDays.length === 2 && weekend.every(d => sortedDays.includes(d))) return "on the weekend.";

        // Map abbreviations to full names
        const fullNames = sortedDays.map(d => dayMap[d]);

        if (fullNames.length === 1) return `on ${fullNames[0]}`;
        if (fullNames.length === 2) return `on ${fullNames[0]} and ${fullNames[1]}`;

        // For 3+ days, join with commas and 'and'
        const lastDay = fullNames[fullNames.length - 1];
        const otherDays = fullNames.slice(0, -1);
        return `on ${otherDays.join(", ")} and ${lastDay}`;
    };

    const cleanHabitName = (title: string): string => {
        let cleaned = title.trim();
        cleaned = cleaned.replace(/\.$/, "");
        cleaned = cleaned.toLocaleLowerCase()
        return cleaned;
    };



    const handleToggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const handleToggleAll = () => {
        if (selectedDays.length === daysOfWeek.length) {
            setSelectedDays([]);
        } else {
            setSelectedDays([...daysOfWeek]);
        }
    };

    const handleCreateHabit = async () => {
        if (!user) return;
        setLoading(true);

        const name = cleanHabitName(habitName)

        try {
            await createHabit({
                title: name,
                description: habitDescription || null,
                frequency: selectedDays.length > 0 ? selectedDays : [...daysOfWeek], // default to all if none selected
                start_date: new Date().toISOString().split("T")[0],
                user_id: user.id,
                tags: ["test"],
                goal: null,
                custom_days: null,
            });

            setFirstHabitCreated(true);
            shootFireworks()
            // Fire a single burst

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
                                Habit Title:
                            </label>
                            <input
                                id="habitName"
                                type="text"
                                placeholder="e.g. Make my bed"
                                className="w-full border-2 px-3 py-2 rounded"
                                required
                                value={habitName}
                                onChange={(e) => setHabitName(e.target.value)}
                                maxLength={45}
                            />
                            <span className="text-sm text-gray-400 mt-1">
                                {habitName.length}/45
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="habitDescription" className="font-semibold">
                                Habit Description <span className="text-gray-400">(optional)</span>
                            </label>
                            <textarea
                                id="habitDescription"
                                placeholder="Optional – add a reason or motivation for this habit"
                                rows={2}
                                className="w-full border-2 px-3 py-2 rounded resize-none"
                                value={habitDescription}
                                onChange={(e) => setHabitDescription(e.target.value)}
                                maxLength={100}
                            />
                            <span className="text-sm text-gray-400 mt-1">
                                {habitDescription.length}/100
                            </span>
                        </div>


                        {/* Frequency Selector */}
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Frequency:</span>
                                <button
                                    type="button"
                                    onClick={handleToggleAll}
                                    className="text-sm bg-gray-700/60 hover:bg-gray-700 px-2 py-1 rounded text-white transition"
                                >
                                    {selectedDays.length === daysOfWeek.length ? "Deselect All" : "Select All"}
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center">
                                {daysOfWeek.map((day) => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => handleToggleDay(day)}
                                        className={`border rounded py-2 transition
                                            ${selectedDays.includes(day)
                                                ? "bg-yellow-300 dark:bg-gray-700"
                                                : "hover:bg-gray-700"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <span className="text-sm text-gray-400 mt-1">
                                Select which days you want to perform this habit
                            </span>
                        </div>

                        {/* Submit */}
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
                    <div className="text-center flex flex-col items-center gap-4">
                        <div className="flex justify-center items-center flex-wrap text-2xl font-bold text-green-400 gap-2 text-center">
                            <span>🎉</span>
                            <span className="break-words">
                                I will {cleanHabitName(habitName)} {formatFrequency(selectedDays)}
                            </span>
                            <span>🎉</span>
                        </div>

                        <button
                            onClick={goToDashboard}
                            className="px-6 py-3 bg-yellow-300 rounded hover:bg-yellow-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                            I Promise!
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default SignUp;
