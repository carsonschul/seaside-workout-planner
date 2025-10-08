import ConfirmModal from "../components/ConfirmModal.jsx";
export default function DayCard({
    s,
    presetFocus,
    showFocusDropdown,
    setShowFocusDropdown,
    setShowSplitDropdown,
    pendingFocus,
    setPendingFocus,
    warningMessage,
    setWarningMessage,
    setSchedules,
    schedules,
    pendingExercise,
    setPendingExercise,
    showModal,
    setShowModal,
    pendingWeight,
    setPendingWeight,
    pendingSets,
    setPendingSets,
    pendingReps,
    setPendingReps,
}) {
    return (
        <div
            key={s.Day}
            className="flex flex-col items-center gap-4 justify-center bg-gradient-to-b from-sky-100 to-sky-200 border border-sky-400 rounded-xl p-4 w-1/2 shadow-lg"
        >
            {/* --- Day header --- */}
            <h2 className="text-3xl font-bold">{s.Day}</h2>

            {/* --- Focus selection or focus display --- */}
            {!s.Focus && showFocusDropdown !== s.Day && (
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
                        onChange={(e) => setPendingFocus(e.target.value)}
                    >
                        <option value="" disabled>
                            Choose a focus:
                        </option>
                        {presetFocus.map((focus) => (
                            <option key={focus} value={focus}>
                                {focus}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-4">
                        <button
                            className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => {
                                if (pendingFocus === "") return setWarningMessage("focus");
                                setSchedules(
                                    schedules.map((d) =>
                                        d.Day === s.Day ? { ...d, Focus: `Focus: ${pendingFocus}` } : d
                                    )
                                );
                                setShowFocusDropdown(null);
                                setPendingFocus("");
                                setWarningMessage(null);
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => {
                                setShowFocusDropdown(null);
                                setPendingFocus("");
                                setWarningMessage(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                    {warningMessage === "focus" && (
                        <p className="text-lg text-red-600 text-center">
                            Please choose a focus
                        </p>
                    )}
                </div>
            )}

            {/* --- Focus display --- */}
            {s.Focus && (
                <p className="text-xl font-bold text-center ">{s.Focus}</p>
            )}

            {/* --- Exercises or placeholder --- */}
            {s.Exercises.length === 0 ? (
                <p className="text-lg">No exercise data yet</p>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-rose-100 to-rose-200 border border-red-400 shadow-lg rounded-xl px-6 py-4">
                    <p className="font-bold text-xl">Exercises:</p>
                    <ul className="flex flex-col gap-4 text-lg">
                        {s.Exercises.map((exercise, i) => (
                            <li key={i} className="flex gap-4 items-center justify-between bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border border-amber-400 px-6 py-4 shadow-lg">
                                <div className="flex flex-col gap-4 items-center justify-center">
                                    <div className="flex gap-4">
                                        <span className="text-lg font-semibold">{i + 1}.</span>
                                        <span className="font-semibold">{exercise.Exercise}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span>{`Weight: ${exercise.Weight}`}</span>
                                        <span>{`Sets: ${exercise.Sets}`}</span>
                                        <span>{`Reps: ${exercise.Reps.join(", ")}`}</span>
                                    </div>
                                </div>
                                <button
                                    className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => setShowModal({ Type: "exercise", Day: s.Day, Index: i })}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* --- Bottom controls (always visible when focus exists) --- */}
            {s.Focus && (
                <div className="flex gap-4 mt-2">
                    {s.Focus !== "Rest Day" && (
                        <button
                            className="bg-white text-lg hover:bg-amber-100 border border-amber-500 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => { setShowModal({ Type: "exercise-input", Day: s.Day }) }}
                        >
                            Add Exercise
                        </button>
                    )}
                    <button
                        className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setShowModal({ Type: "day", Day: s.Day })}
                    >
                        Clear Day
                    </button>
                </div>
            )}

            {/* --- Exercise Input (below buttons, appears only when adding) --- */}
            {(showModal.Type === "exercise-input" && showModal.Day === s.Day) && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
                    <div className="bg-white border border-black rounded-lg shadow-2xl p-8 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col gap-4 items-center justify-center">
                            <div className="flex gap-4 justify-between w-full items-center">
                                <label htmlFor="exercise-input" className="text-lg flex-1 text-center">
                                    Enter exercise:
                                </label>
                                <input
                                    id="exercise-input"
                                    type="text"
                                    value={pendingExercise}
                                    onChange={(e) => setPendingExercise(e.target.value)}
                                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="flex gap-4 justify-between w-full items-center">
                                <label
                                    htmlFor="weight-input"
                                    className="text-lg flex-1 text-center">
                                    Enter weight:
                                </label>
                                <input
                                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                    id="weight-input"
                                    type="number"
                                    value={pendingWeight}
                                    onChange={(e) => setPendingWeight(e.target.value)} />
                            </div>
                            <div className="flex gap-4 justify-between w-full items-center">
                                <label
                                    htmlFor="sets-input"
                                    className="text-lg flex-1 text-center">
                                    Enter sets:
                                </label>
                                <input
                                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                    id="sets-input"
                                    type="number"
                                    value={pendingSets}
                                    onChange={(e) => {
                                        const input = e.target.value
                                        if (input === "") {
                                            setPendingSets("");
                                            return;
                                        }
                                        const value = Number(input);
                                        if (value < 0) return setPendingSets("0");
                                        if (value > 100) return setPendingSets("100");
                                        setPendingSets(value);
                                        setPendingReps(Array(value).fill(""));
                                    }} />
                            </div>
                            {pendingSets > 0 && (
                                <>
                                    {Array.from({ length: pendingSets }).map((_, i) => (
                                        <div key={i} className="flex gap-4 justify-between w-full items-center">
                                            <label className="text-lg flex-1 text-center">{`Set ${i + 1}:`}</label>
                                            <input
                                                type="number"
                                                placeholder="Reps"
                                                className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                                value={pendingReps[i] || ""}
                                                onChange={(e) => {
                                                    const newReps = [...pendingReps];
                                                    newReps[i] = e.target.value;
                                                    setPendingReps(newReps);
                                                }}

                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                            <div className="flex gap-4">
                                <button
                                    className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => {
                                        const missing = [];
                                        let isError = false;
                                        if (!pendingExercise.trim()) {
                                            missing.push("exercise");
                                            isError = true;
                                        }
                                        if (!pendingWeight.trim()) {
                                            missing.push("weight");
                                            isError = true;
                                        }
                                        if (pendingSets === "" || pendingSets <= 0) {
                                            missing.push("sets")
                                            isError = true;
                                        }
                                        if (pendingReps.length === 0 || pendingReps.some(r => !r.trim())) {
                                            missing.push("reps");
                                            isError = true;
                                        }
                                        if (isError) return setWarningMessage(missing);
                                        setSchedules(
                                            schedules.map((d) =>
                                                d.Day === s.Day
                                                    ? { ...d, Exercises: [...d.Exercises, { Exercise: pendingExercise, Weight: pendingWeight, Sets: pendingSets, Reps: pendingReps }] }
                                                    : d
                                            )
                                        );
                                        setPendingExercise("");
                                        setPendingWeight("");
                                        setPendingSets("");
                                        setPendingReps("");
                                        setWarningMessage(null);
                                        setShowModal({ Type: null, Day: null });
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => {
                                        setPendingExercise("");
                                        setPendingWeight("");
                                        setPendingSets("");
                                        setPendingReps("");
                                        setWarningMessage(null);
                                        setShowModal({ Type: null, Day: null });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                            {warningMessage?.includes("exercise") && (
                                <p className="text-lg text-red-600 text-center">
                                    Please enter an exercise
                                </p>
                            )}
                            {warningMessage?.includes("weight") && (
                                <p className="text-lg text-red-600 text-center">
                                    Please enter weight
                                </p>
                            )}
                            {warningMessage?.includes("sets") && (
                                <p className="text-lg text-red-600 text-center">
                                    Please enter sets
                                </p>
                            )}
                            {warningMessage?.includes("reps") && (
                                <p className="text-lg text-red-600 text-center">
                                    Please enter reps
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- Exercise Delete Modal --- */}
            {showModal.Type === "exercise" && showModal.Day === s.Day && (
                <ConfirmModal
                    message={
                        <>
                            Are you sure you want to delete this exercise?
                            <br />
                            This will also delete your logged sets and reps.
                        </>
                    }
                    onConfirm={() => {
                        setSchedules(
                            schedules.map((d) =>
                                d.Day === s.Day
                                    ? {
                                        ...d,
                                        Exercises: d.Exercises.filter(
                                            (_, index) => index !== showModal.Index
                                        ),
                                    }
                                    : d
                            )
                        );
                        setShowModal({ Type: null, Day: null });
                    }}
                    onCancel={() => setShowModal({ Type: null, Day: null })}
                />
            )}
        </div>
    );
}