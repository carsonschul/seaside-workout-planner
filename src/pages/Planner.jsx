import { useState } from "react";
export default function Planner() {

    const [schedules, setSchedules] = useState([
        { Day: "Monday", Focus: "" },
        { Day: "Tuesday", Focus: "" },
        { Day: "Wednesday", Focus: "" },
        { Day: "Thursday", Focus: "" },
        { Day: "Friday", Focus: "" },
        { Day: "Saturday", Focus: "" },
        { Day: "Sunday", Focus: "" }
    ]);
    const presetMuscles = [
        "Full Body",
        "Push",
        "Pull",
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Arms"
    ]
    const splitSchedules = {
        "Full Body": [
            { Day: "Monday", Muscle: "Focus: Full Body" },
            { Day: "Tuesday", Muscle: "Rest Day" },
            { Day: "Wednesday", Muscle: "Focus: Full Body" },
            { Day: "Thursday", Muscle: "Focus: Rest Day" },
            { Day: "Friday", Muscle: "Focus: Full Body" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" }
        ],
        "Upper Lower": [
            { Day: "Monday", Muscle: "Focus: Upper Lower" },
            { Day: "Tuesday", Muscle: "Focus: Upper Lower" },
            { Day: "Wednesday", Muscle: "Rest Day" },
            { Day: "Thursday", Muscle: "Focus: Upper Lower" },
            { Day: "Friday", Muscle: "Focus: Upper Lower" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" }
        ],
        "Push Pull Legs": [
            { Day: "Monday", Muscle: "Focus: Push" },
            { Day: "Tuesday", Muscle: "Focus: Pull" },
            { Day: "Wednesday", Muscle: "Focus: Legs" },
            { Day: "Thursday", Muscle: "Focus: Push" },
            { Day: "Friday", Muscle: "Focus: Pull" },
            { Day: "Saturday", Muscle: "Focus: Legs" },
            { Day: "Sunday", Muscle: "Rest Day" }
        ],
        "Bro Split": [
            { Day: "Monday", Muscle: "Focus: Chest" },
            { Day: "Tuesday", Muscle: "Focus: Back" },
            { Day: "Wednesday", Muscle: "Focus: Legs" },
            { Day: "Thursday", Muscle: "Focus: Shoulders" },
            { Day: "Friday", Muscle: "Focus: Arms" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" }
        ]
    }

    const [pendingSplit, setPendingSplit] = useState("Choose a split:")
    const [showSplitDropdown, setShowSplitDropdown] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(false);

    return (
        <div
            className="flex flex-col min-h-screen items-center gap-4">
            <h1
                className="text-5xl font-bold text-center w-screen p-6 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg tracking-wide rounded">
                Plan Your Workout
            </h1>
            <div
                className="flex flex-col items-center w-1/2 bg-gray-200 rounded-xl p-4 gap-4 shadow-lg">
                <h2
                    className="text-3xl text-center font-bold">Instructions:</h2>
                <p
                    className="text-xl text-center">Begin by selecting a muscle focus for each day to create your workout split. Alternatively, you can select from a list of preset splits below.</p>
                {!showSplitDropdown && (
                    <button
                        className="text-lg bg-amber-300 hover:bg-amber-400 transition-colors duration-200 rounded-xl shadow-lg px-4 py-2 cursor-pointer"
                        onClick={() => setShowSplitDropdown(true)}>
                        Use a preset split
                    </button>
                )}
                {showSplitDropdown && (
                    <div
                        className="flex flex-col gap-4">
                        <select
                            className="bg-white text-lg hover:bg-gray-100 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            value={pendingSplit}
                            onChange={(e) => setPendingSplit(e.target.value)}>
                            <option
                                value="Choose a split:"
                                disabled>
                                Choose a split:
                            </option>
                            {Object.keys(splitSchedules).map((split) => (
                                <option
                                    key={split}
                                    value={split} >
                                    {split}
                                </option>
                            ))}
                        </select>
                        <div className="flex gap-4">
                            <button
                                className="bg-green-400 hover:bg-green-500 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    setShowSplitDropdown(false);
                                    setSchedules(schedules.map(s => (
                                        {
                                            ...s,
                                            Focus: splitSchedules[pendingSplit].find(d => (d.Day === s.Day))?.Muscle || ""
                                        }
                                    )))
                                    setPendingSplit("Choose a split:");
                                }}>
                                Confirm
                            </button>
                            <button
                                className="bg-red-400 hover:bg-red-500 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    setShowSplitDropdown(false);
                                    setPendingSplit("Choose a split:")
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {
                schedules.map(s => (
                    <div
                        key={s.Day}
                        className="flex flex-col items-center gap-4 justify-center bg-sky-200 rounded-xl p-4 w-1/2 shadow-lg">
                        <h2
                            className="text-3xl font-bold">
                            {s.Day}
                        </h2>
                        {!s.Focus && (
                            <button
                                className="text-lg bg-white hover:bg-gray-100 transition-colors duration-200 rounded-xl px-4 py-2 shadow-lg cursor-pointer"
                                onClick={() => (
                                    alert("Feature coming soon!")
                                )}>
                                Select muscle focus
                            </button>
                        )}
                        {s.Focus && (
                            <div className="flex gap-4 justify-center items-center">
                                <p className="text-lg font-bold">
                                    {s.Focus}
                                </p>
                                <button
                                    className="bg-red-400 hover:bg-red-500 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => setSchedules(
                                        schedules.map(d => (
                                            d.Day === s.Day ? { ...d, Focus: "" } : d
                                        )))}>
                                    Delete
                                </button>
                            </div>
                        )}
                        <p
                            className="text-lg">
                            No data yet
                        </p>
                    </div>
                ))
            }
        </div >
    )
}