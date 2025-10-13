import ConfirmModal from "../components/ConfirmModal.jsx";
import Button from "../components/Button";

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
    isBodyweight,
    setIsBodyweight,
}) {
    return (
        <div
            key={s.Day}
            className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 border-3 border-amber-400 rounded-3xl md:w-1/2 w-full shadow-lg overflow-hidden"
        >
            <div className="flex flex-col gap-2 items-center justify-center bg-gradient-to-r from-red-400 to-red-600 w-full py-4">
                <h2 className="text-3xl font-bold text-white text-shadow-lg">{s.Day}</h2>
                {s.Focus ? (
                    <p className="text-xl font-bold text-center text-white text-shadow-lg ">
                        {s.Focus}
                    </p>
                ) : (
                    <p className="text-xl font-bold text-center text-white text-shadow-lg ">
                        No focus yet
                    </p>
                )}
            </div>

            {s.Exercises.length === 0 ? (
                <p className="text-lg p-8 w-full h-full flex items-center justify-center bg-white border-t-3 border-amber-400">
                    No exercise data yet
                </p>
            ) : (
                <div className="w-full">
                    <ul className="flex flex-col text-lg w-full border-t-3 border-amber-400">
                        {s.Exercises.map((exercise, i) => (
                            <li
                                key={i}
                                className="flex md:flex-row flex-col gap-8 items-center justify-between bg-white p-8 shadow-inner"
                            >
                                <div className="flex flex-col gap-4 justify-center">
                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <span className="text-lg font-semibold">{i + 1}.</span>
                                        <span className="font-semibold">{exercise.Exercise}</span>
                                    </div>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col border-r-2 border-amber-400 pr-4">
                                            <span className="font-semibold">Weight: </span>
                                            {exercise.Weight}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Sets: </span>
                                            {exercise.Sets}
                                        </div>
                                        <div className="flex flex-col border-l-2 border-amber-400 pl-4">
                                            <span className="font-semibold">Reps: </span>
                                            {exercise.Reps.join(", ")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        variant="amber"
                                        onClick={() => {
                                            const ex = s.Exercises[i];
                                            setPendingExercise(ex.Exercise);
                                            setPendingWeight(ex.Weight);
                                            setPendingSets(ex.Sets);
                                            setPendingReps(ex.Reps);
                                            setIsBodyweight(ex.Weight === "Bodyweight");
                                            setShowModal({
                                                Type: "edit-exercise",
                                                Day: s.Day,
                                                Index: i,
                                            });
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="red"
                                        onClick={() =>
                                            setShowModal({ Type: "exercise", Day: s.Day, Index: i })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-4 pb-4 bg-white w-full items-center justify-center">
                {s.Focus && (
                    <>
                        {s.Focus !== "Rest Day" && (
                            <Button
                                variant="sky"
                                onClick={() =>
                                    setShowModal({ Type: "exercise-input", Day: s.Day })
                                }
                            >
                                Add Exercise
                            </Button>
                        )}
                        <Button
                            variant="red"
                            onClick={() => setShowModal({ Type: "day", Day: s.Day })}
                        >
                            Clear Day
                        </Button>
                    </>
                )}

                {!s.Focus && showFocusDropdown !== s.Day && (
                    <Button
                        variant="sky"
                        onClick={() => {
                            setShowFocusDropdown(s.Day);
                            setShowSplitDropdown(false);
                        }}
                    >
                        Select muscle focus
                    </Button>
                )}

                {showFocusDropdown === s.Day && (
                    <div className="flex flex-col gap-4">
                        <select
                            className="bg-white text-lg hover:bg-gray-100 border-2 border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
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
                            <Button
                                variant="sky"
                                onClick={() => {
                                    if (pendingFocus === "") return setWarningMessage("focus");
                                    setSchedules(
                                        schedules.map((d) =>
                                            d.Day === s.Day
                                                ? { ...d, Focus: `Focus: ${pendingFocus}` }
                                                : d
                                        )
                                    );
                                    setShowFocusDropdown(null);
                                    setPendingFocus("");
                                    setWarningMessage(null);
                                }}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="red"
                                onClick={() => {
                                    setShowFocusDropdown(null);
                                    setPendingFocus("");
                                    setWarningMessage(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                        {warningMessage === "focus" && (
                            <p className="text-lg text-red-600 text-center">
                                Please choose a focus
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Exercise Input / Edit Modal */}
            {(showModal.Type === "exercise-input" ||
                showModal.Type === "edit-exercise") &&
                showModal.Day === s.Day && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center overflow-y-auto">
                        <div className="bg-white border border-black rounded-lg shadow-2xl p-8 flex flex-col gap-4 max-h-[90dvh] max-w-[90vw] overflow-y-auto">
                            <div className="flex flex-col gap-4 items-center justify-center max-w-full">
                                <div className="flex flex-col gap-2 justify-between items-center w-full max-w-full">
                                    <label htmlFor="exercise-input" className="text-lg">
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

                                <div className="flex flex-col gap-2 justify-between items-center w-full max-w-full">
                                    <label htmlFor="weight-input" className="text-lg">
                                        Enter weight:
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                            id="weight-input"
                                            type="number"
                                            disabled={isBodyweight}
                                            value={isBodyweight ? "" : pendingWeight}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                if (value.length > 5) value = value.slice(0, 5);
                                                setPendingWeight(value);
                                            }}
                                            placeholder={isBodyweight ? "Bodyweight" : ""}
                                        />
                                        <Button
                                            variant={isBodyweight ? "red" : "amber"}
                                            className="!px-2 !py-1 absolute right-1 top-1"
                                            onClick={() => {
                                                setIsBodyweight(!isBodyweight);
                                                setPendingWeight("");
                                            }}
                                        >
                                            {isBodyweight ? "Clear" : "BW?"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 justify-between w-full max-w-full items-center">
                                    <label htmlFor="sets-input" className="text-lg">
                                        Enter sets:
                                    </label>
                                    <input
                                        className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                                        id="sets-input"
                                        type="number"
                                        value={pendingSets}
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            if (input === "") {
                                                setPendingSets("");
                                                return;
                                            }
                                            const value = Number(input);
                                            if (value < 0) return setPendingSets("0");
                                            if (value > 100) return setPendingSets("100");
                                            setPendingSets(value);
                                            setPendingReps(Array(value).fill(""));
                                        }}
                                    />
                                </div>

                                {pendingSets > 0 &&
                                    Array.from({ length: pendingSets }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col gap-2 justify-between w-full items-center"
                                        >
                                            <label className="text-lg flex-1 text-center">{`Set ${i + 1
                                                }:`}</label>
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

                                <div className="flex gap-4">
                                    <Button
                                        variant="sky"
                                        onClick={() => {
                                            const missing = [];
                                            let isError = false;

                                            if (!pendingExercise.trim()) {
                                                missing.push("exercise");
                                                isError = true;
                                            }
                                            if (!pendingWeight.trim() && !isBodyweight) {
                                                missing.push("weight");
                                                isError = true;
                                            }
                                            if (pendingSets === "" || pendingSets <= 0) {
                                                missing.push("sets");
                                                isError = true;
                                            }
                                            if (
                                                pendingReps.length === 0 ||
                                                pendingReps.some((r) => !r.trim())
                                            ) {
                                                missing.push("reps");
                                                isError = true;
                                            }
                                            if (isError) return setWarningMessage(missing);

                                            if (showModal.Type === "edit-exercise") {
                                                setSchedules(
                                                    schedules.map((d) =>
                                                        d.Day === s.Day
                                                            ? {
                                                                ...d,
                                                                Exercises: d.Exercises.map((ex, idx) =>
                                                                    idx === showModal.Index
                                                                        ? {
                                                                            Exercise: pendingExercise,
                                                                            Weight: isBodyweight
                                                                                ? "Bodyweight"
                                                                                : pendingWeight,
                                                                            Sets: pendingSets,
                                                                            Reps: pendingReps,
                                                                        }
                                                                        : ex
                                                                ),
                                                            }
                                                            : d
                                                    )
                                                );
                                            } else {
                                                setSchedules(
                                                    schedules.map((d) =>
                                                        d.Day === s.Day
                                                            ? {
                                                                ...d,
                                                                Exercises: [
                                                                    ...d.Exercises,
                                                                    {
                                                                        Exercise: pendingExercise,
                                                                        Weight: isBodyweight
                                                                            ? "Bodyweight"
                                                                            : pendingWeight,
                                                                        Sets: pendingSets,
                                                                        Reps: pendingReps,
                                                                    },
                                                                ],
                                                            }
                                                            : d
                                                    )
                                                );
                                            }

                                            setPendingExercise("");
                                            setPendingWeight("");
                                            setPendingSets("");
                                            setPendingReps("");
                                            setIsBodyweight(false);
                                            setWarningMessage(null);
                                            setShowModal({ Type: null, Day: null });
                                        }}
                                    >
                                        Confirm
                                    </Button>

                                    <Button
                                        variant="red"
                                        onClick={() => {
                                            setPendingExercise("");
                                            setPendingWeight("");
                                            setPendingSets("");
                                            setPendingReps("");
                                            setIsBodyweight(false);
                                            setWarningMessage(null);
                                            setShowModal({ Type: null, Day: null });
                                        }}
                                    >
                                        Cancel
                                    </Button>
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

            {/* Delete Exercise Modal */}
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
