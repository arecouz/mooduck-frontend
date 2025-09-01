import Cell from "../components/habit/Cell";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/auth/useAuth";
import { useState } from "react";


const SignUp = () => {
    const { user } = useAuth(); // Get user from AuthProvider
    const [firstHabitCreated, setFirstHabitCreated] = useState(false);

    const userSignedUp = !!user; // derived from session

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

            <div className="w-full max-w-md rounded-xl p-6 flex flex-col items-center">
                {!userSignedUp ? (
                    <AuthForm mode="signup" />
                ) : (
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
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="habitDescription" className="font-semibold">
                                Habit Description:
                            </label>
                            <textarea
                                id="habitDescription"
                                rows={2} // two-line height
                                className="w-full border-2 px-3 py-2 rounded resize-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setFirstHabitCreated(true)}
                            className="mt-2 px-4 py-2 bg-yellow-300 rounded hover:bg-yellow-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default SignUp;
