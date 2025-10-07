import { useState } from "react";
import Instructions from "../components/Instructions.jsx";
import DayCard from "../components/DayCard.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
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
            <Instructions
                showSplitDropdown={showSplitDropdown}
                setShowSplitDropdown={setShowSplitDropdown}
                setShowFocusDropdown={setShowFocusDropdown}
                showModal={showModal}
                setShowModal={setShowModal}
                schedules={schedules}
                setSchedules={setSchedules}
                pendingSplit={pendingSplit}
                setPendingSplit={setPendingSplit}
                splitSchedules={splitSchedules}
                warningMessage={warningMessage}
                setWarningMessage={setWarningMessage}
            />
            {
                schedules.map(s => (
                    <DayCard
                        key={s.Day}
                        s={s}
                        presetFocus={presetFocus}
                        showFocusDropdown={showFocusDropdown}
                        setShowFocusDropdown={setShowFocusDropdown}
                        setShowSplitDropdown={setShowSplitDropdown}
                        pendingFocus={pendingFocus}
                        setPendingFocus={setPendingFocus}
                        warningMessage={warningMessage}
                        setWarningMessage={setWarningMessage}
                        schedules={schedules}
                        setSchedules={setSchedules}
                        liftInput={liftInput}
                        setLiftInput={setLiftInput}
                        pendingLift={pendingLift}
                        setPendingLift={setPendingLift}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                ))
            }
            {showModal.Type === "day" && (
                <ConfirmModal
                    message={
                        <>
                            Are you sure you want to clear your day?
                        </>
                    }
                    onConfirm={() => {
                        setSchedules(
                            schedules.map(d => (
                                d.Day === showModal.Day ? { ...d, Focus: "", Lifts: [] } : d
                            )));
                        setShowModal({ Type: null, Day: null });
                    }}
                    onCancel={() => setShowModal({ Type: null, Day: null })}
                />
            )}
        </div >
    )
}