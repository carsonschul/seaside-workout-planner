import { useState } from "react";
export default function Planner() {

    const [schedules, setSchedules] = useState([
        { Day: "Monday", Focus: "", Lifts: [] },
        { Day: "Tuesday", Focus: "", Lifts: [] },
        { Day: "Wednesday", Focus: "", Lifts: [] },
        { Day: "Thursday", Focus: "", Lifts: [] },
        { Day: "Friday", Focus: "", Lifts: [] },
        { Day: "Saturday", Focus: "", Lifts: [] },
        { Day: "Sunday", Focus: "", Lifts: [] }
    ]);
    const presetFocus = [
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
            { Day: "Thursday", Muscle: " Rest Day" },
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

    const [pendingSplit, setPendingSplit] = useState("")
    const [pendingFocus, setPendingFocus] = useState("")
    const [showSplitDropdown, setShowSplitDropdown] = useState(false);
    const [showFocusDropdown, setShowFocusDropdown] = useState(null);
    const [warningMessage, setWarningMessage] = useState(null);
    const [showModal, setShowModal] = useState({ Type: null, Day: null });
    const [liftInput, setLiftInput] = useState(null);
    const [pendingLift, setPendingLift] = useState("");

    return (
        <div
            className="flex flex-col min-h-screen items-center gap-4">
            <h1
                className="text-5xl font-bold text-center w-screen p-6 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg tracking-wide rounded">
                Plan Your Workout
            </h1>
            <div
                className="flex flex-col items-center w-1/2 bg-gray-100 border border-gray-400 rounded-xl p-4 gap-4 shadow-lg">
                <h2
                    className="text-3xl text-center font-bold">Instructions:</h2>
                <p
                    className="text-xl text-center">Begin by selecting a muscle focus for each day to create your workout split. Alternatively, you can select from a list of preset splits below.</p>
                {!showSplitDropdown && (
                    <div className="flex gap-4">
                        <button
                            className="text-lg bg-white hover:bg-amber-100 border border-amber-500 transition-colors duration-200 rounded-lg shadow-lg px-4 py-2 cursor-pointer"
                            onClick={() => {
                                setShowSplitDropdown(true);
                                setShowFocusDropdown(false);
                            }}>
                            Use a preset split
                        </button>
                        {schedules.some(s => s.Focus) && (
                            <button
                                className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => setShowModal({ Type: "plan", Day: null })}>
                                Clear plan
                            </button>
                        )}
                    </div>
                )}
                {showModal.Type === "plan" && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50">
                        <div
                            className="flex justify-center items-center h-full">
                            <div
                                className="flex flex-col gap-4 bg-white rounded-lg p-8 border border-black shadow-2xl">
                                <p
                                    className="text-lg">
                                    Are you sure you want to clear your plan?
                                </p>
                                <div className="flex gap-4 justify-center items-center">
                                    <button
                                        className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            setSchedules(schedules.map(s => (
                                                { ...s, Focus: "" }
                                            )));
                                            setShowModal({ Type: null, Day: null });
                                        }}>
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => setShowModal({ Type: null, Day: null })}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showSplitDropdown && (
                    <div
                        className="flex flex-col gap-4">
                        <select
                            className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            value={pendingSplit}
                            onChange={(e) => setPendingSplit(e.target.value)}>
                            <option
                                value=""
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
                                className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    if (pendingSplit === "") {
                                        setWarningMessage("split");
                                    } else {
                                        setShowSplitDropdown(false);
                                        setSchedules(schedules.map(s => (
                                            {
                                                ...s,
                                                Focus: splitSchedules[pendingSplit].find(d => (d.Day === s.Day))?.Muscle || ""
                                            }
                                        )))
                                        setPendingSplit("");
                                        setWarningMessage(null);
                                    }
                                }}>
                                Confirm
                            </button>
                            <button
                                className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    setShowSplitDropdown(false);
                                    setPendingSplit("")
                                    setWarningMessage(null);
                                }}>
                                Cancel
                            </button>
                        </div>
                        {warningMessage === "split" && (
                            <p className="text-lg text-red-600 text-center">Please choose a split</p>
                        )}
                    </div>
                )}
            </div>
            {
                schedules.map(s => (
                    <div
                        key={s.Day}
                        className="flex flex-col items-center gap-4 justify-center bg-gradient-to-b from-sky-100 to-sky-200 border border-sky-400 rounded-xl p-4 w-1/2 shadow-lg">
                        <h2
                            className="text-3xl font-bold">
                            {s.Day}
                        </h2>
                        {(!s.Focus && (showFocusDropdown !== s.Day)) && (
                            <button
                                className="bg-white hover:bg-amber-100 border border-amber-500 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                onClick={() => {
                                    setShowFocusDropdown(s.Day);
                                    setShowSplitDropdown(false);
                                }}
                            >
                                Select muscle focus
                            </button>
                        )}
                        {showFocusDropdown === s.Day && (
                            <div className="flex flex-col gap-4">
                                <select
                                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    value={pendingFocus}
                                    onChange={(e) => setPendingFocus(e.target.value)}>
                                    <option
                                        value=""
                                        disabled>
                                        Choose a focus:
                                    </option>
                                    {presetFocus.map(focus => (
                                        <option
                                            key={focus}
                                            value={focus}>
                                            {focus}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex gap-4">
                                    <button
                                        className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            if (pendingFocus === "") {
                                                setWarningMessage("focus")
                                            } else {
                                                setSchedules(schedules.map(d => (
                                                    d.Day === s.Day ? { ...d, Focus: `Focus: ${pendingFocus}` } : d
                                                )));
                                                setShowFocusDropdown(null);
                                                setPendingFocus("");
                                                setWarningMessage(null);
                                            }
                                        }
                                        }>
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            setShowFocusDropdown(null);
                                            setPendingFocus("");
                                            setWarningMessage(null);
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        {(showFocusDropdown === s.Day) && (warningMessage === "focus") && (
                            <p className="text-lg text-red-600 text-center">Please choose a focus</p>
                        )}
                        {(s.Focus && liftInput !== s.Day) && (
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <p className="text-lg font-bold">
                                    {s.Focus}
                                </p>
                                <div className="flex gap-4">
                                    {s.Focus !== "Rest Day" && (
                                        <button
                                            className="bg-white text-lg hover:bg-amber-100 border border-amber-500 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                            onClick={() => setLiftInput(s.Day)}>
                                            Add Lift/Exercise
                                        </button>
                                    )}
                                    <button
                                        className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => setShowModal({ Type: "day", Day: s.Day })}>
                                        Clear day
                                    </button>
                                </div>
                            </div>
                        )}
                        {liftInput === s.Day && (
                            <div className="flex flex-col gap-4 items-center justify-center">
                                <label
                                    htmlFor="lift-input">
                                    Enter Lift/Exercise:
                                </label>
                                <input
                                    id="lift-input"
                                    type="text"
                                    value={pendingLift}
                                    onChange={e => setPendingLift(e.target.value)}
                                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg" />
                                <div className="flex gap-4">
                                    <button
                                        className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            if (!pendingLift.trim()) {
                                                return setWarningMessage("lift");
                                            }
                                            setSchedules(schedules.map(d => (
                                                d.Day === s.Day
                                                    ? { ...d, Lifts: [...d.Lifts, pendingLift] }
                                                    : d
                                            )))
                                            setPendingLift("");
                                            setLiftInput(null);
                                            setWarningMessage(null);
                                        }}>
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            setPendingLift("");
                                            setLiftInput(null);
                                            setWarningMessage(null);
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                                {warningMessage === "lift" && (
                                    <p className="text-lg text-red-600 text-center">Please type a lift/exercise</p>
                                )}
                            </div>
                        )}
                        {s.Lifts.length === 0 && (
                            <p
                                className="text-lg">
                                No data yet
                            </p>
                        )}
                        {s.Lifts.length > 0 && (
                            s.Lifts.map((lift, i) => (
                                <p
                                    key={i}
                                    className="text-lg">
                                    {lift}
                                </p>
                            ))
                        )}
                    </div>
                ))
            }
            {showModal.Type === "day" && (
                <div
                    className="fixed inset-0 z-50 bg-black/50">
                    <div
                        className="flex justify-center items-center h-full">
                        <div
                            className="flex flex-col gap-4 bg-white rounded-lg p-8 border border-black shadow-2xl">
                            <p
                                className="text-lg">
                                Are you sure you want to clear your day?
                            </p>
                            <div className="flex gap-4 justify-center items-center">
                                <button
                                    className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => {
                                        setSchedules(
                                            schedules.map(d => (
                                                d.Day === showModal.Day ? { ...d, Focus: "", Lifts: [] } : d
                                            )));
                                        setShowModal({ Type: null, Day: null });
                                    }}>
                                    Confirm
                                </button>
                                <button
                                    className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => setShowModal({ Type: null, Day: null })}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}