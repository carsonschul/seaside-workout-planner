import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Instructions from "../components/Instructions.jsx";
import DayCard from "../components/DayCard.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Button from "../components/Button";

export default function Planner() {
    const [schedules, setSchedules] = useState([
        { Day: "Monday", Focus: "", Exercises: [] },
        { Day: "Tuesday", Focus: "", Exercises: [] },
        { Day: "Wednesday", Focus: "", Exercises: [] },
        { Day: "Thursday", Focus: "", Exercises: [] },
        { Day: "Friday", Focus: "", Exercises: [] },
        { Day: "Saturday", Focus: "", Exercises: [] },
        { Day: "Sunday", Focus: "", Exercises: [] },
    ]);

    const [planName, setPlanName] = useState("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planId = searchParams.get("planId");

    useEffect(() => {
        async function loadPlan() {
            if (!planId) return;
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plan/${planId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data?.schedules) {
                    setSchedules(
                        data.schedules.map((s) => ({
                            Day: s.day,
                            Focus: s.focus,
                            Exercises: s.exercises || [],
                        }))
                    );
                    setPlanName(data.name || "");
                }
            } catch (err) {
                console.error("❌ Error loading plan:", err);
            }
        }

        loadPlan();
    }, [planId]);

    const presetFocus = [
        "Full Body",
        "Push",
        "Pull",
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Arms",
    ];

    const splitSchedules = {
        "Full Body": [
            { Day: "Monday", Muscle: "Focus: Full Body" },
            { Day: "Tuesday", Muscle: "Rest Day" },
            { Day: "Wednesday", Muscle: "Focus: Full Body" },
            { Day: "Thursday", Muscle: "Rest Day" },
            { Day: "Friday", Muscle: "Focus: Full Body" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" },
        ],
        "Upper Lower": [
            { Day: "Monday", Muscle: "Focus: Upper" },
            { Day: "Tuesday", Muscle: "Focus: Lower" },
            { Day: "Wednesday", Muscle: "Rest Day" },
            { Day: "Thursday", Muscle: "Focus: Upper" },
            { Day: "Friday", Muscle: "Focus: Lower" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" },
        ],
        "Push Pull Legs": [
            { Day: "Monday", Muscle: "Focus: Push" },
            { Day: "Tuesday", Muscle: "Focus: Pull" },
            { Day: "Wednesday", Muscle: "Focus: Legs" },
            { Day: "Thursday", Muscle: "Focus: Push" },
            { Day: "Friday", Muscle: "Focus: Pull" },
            { Day: "Saturday", Muscle: "Focus: Legs" },
            { Day: "Sunday", Muscle: "Rest Day" },
        ],
        "Bro Split": [
            { Day: "Monday", Muscle: "Focus: Chest" },
            { Day: "Tuesday", Muscle: "Focus: Back" },
            { Day: "Wednesday", Muscle: "Focus: Legs" },
            { Day: "Thursday", Muscle: "Focus: Shoulders" },
            { Day: "Friday", Muscle: "Focus: Arms" },
            { Day: "Saturday", Muscle: "Rest Day" },
            { Day: "Sunday", Muscle: "Rest Day" },
        ],
    };

    const [pendingSplit, setPendingSplit] = useState("");
    const [pendingFocus, setPendingFocus] = useState("");
    const [showSplitDropdown, setShowSplitDropdown] = useState(false);
    const [showFocusDropdown, setShowFocusDropdown] = useState(null);
    const [warningMessage, setWarningMessage] = useState(null);
    const [showModal, setShowModal] = useState({ Type: null, Day: null });
    const [pendingExercise, setPendingExercise] = useState("");
    const [pendingWeight, setPendingWeight] = useState("");
    const [pendingSets, setPendingSets] = useState("");
    const [pendingReps, setPendingReps] = useState([]);
    const [isBodyweight, setIsBodyweight] = useState(false);

    return (
        <div className="flex flex-col md:min-h-screen min-h-[100dvh] items-center gap-6 bg-gradient-to-b from-gray-50 via-white to-gray-100 pb-6">
            <div className="flex w-full p-6 bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg tracking-wide rounded border-y-4 border-amber-400">
                <div className="flex-1">
                    <Link to="/profile">
                        <Button variant="amber">Go to profile</Button>
                    </Link>
                </div>
                <h1 className="text-5xl text-shadow-lg font-bold mx-auto">
                    Plan Your Workout
                </h1>
                <div className="flex-1" />
            </div>

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

            {schedules.map((s) => (
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
                    pendingExercise={pendingExercise}
                    setPendingExercise={setPendingExercise}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    pendingWeight={pendingWeight}
                    setPendingWeight={setPendingWeight}
                    pendingSets={pendingSets}
                    setPendingSets={setPendingSets}
                    pendingReps={pendingReps}
                    setPendingReps={setPendingReps}
                    isBodyweight={isBodyweight}
                    setIsBodyweight={setIsBodyweight}
                />
            ))}

            {showModal.Type === "day" && (
                <ConfirmModal
                    message={<>Are you sure you want to clear your day?</>}
                    onConfirm={() => {
                        setSchedules(
                            schedules.map((d) =>
                                d.Day === showModal.Day
                                    ? { ...d, Focus: "", Exercises: [] }
                                    : d
                            )
                        );
                        setShowModal({ Type: null, Day: null });
                    }}
                    onCancel={() => setShowModal({ Type: null, Day: null })}
                />
            )}

            <div className="flex flex-col items-center gap-4 mt-6">
                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="plan-name" className="font-medium">
                        Plan Name:
                    </label>
                    <input
                        id="plan-name"
                        type="text"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        placeholder="e.g. Push Pull Legs Program"
                        className="border border-gray-400 rounded px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <Button
                    variant="sky"
                    onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                            alert("Please log in to save your plan.");
                            return;
                        }

                        try {
                            const plansRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plans`, {
                                method: "GET",
                                headers: { Authorization: `Bearer ${token}` },
                            });

                            const existing = await plansRes.json();
                            const planCount = existing.plans?.length || 0;
                            const autoName = `My Plan (${planCount + 1})`;

                            const res = await fetch(
                                `${import.meta.env.VITE_API_BASE_URL}/api/save-plan`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                        name: planName || autoName,
                                        schedules,
                                    }),
                                }
                            );

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Save failed");

                            alert(`✅ Saved as "${planName || autoName}"`);
                            navigate("/profile");
                        } catch (err) {
                            console.error("❌ Save plan error:", err);
                            alert("❌ Something went wrong while saving.");
                        }
                    }}
                >
                    Save Plan
                </Button>
            </div>
        </div>
    );
}
