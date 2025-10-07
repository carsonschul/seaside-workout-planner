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
    liftInput,
    setLiftInput,
    pendingLift,
    setPendingLift,
    showModal,
    setShowModal
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

            {/* --- Lifts or placeholder --- */}
            {s.Lifts.length === 0 ? (
                <p className="text-lg">No lifting data yet</p>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-400 shadow-lg rounded-xl px-6 py-4">
                    <p className="font-bold text-xl">Exercises:</p>
                    <ul className="flex flex-col gap-4 text-lg">
                        {s.Lifts.map((lift, i) => (
                            <li key={i} className="flex gap-4 items-center justify-between">
                                <span className="text-lg">{i + 1}.</span>
                                <span className="flex-1">{lift}</span>
                                <button
                                    className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => setShowModal({ Type: "lift", Day: s.Day, Index: i })}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* --- Bottom controls (always visible when focus exists) --- */}
            {(s.Focus && liftInput !== s.Day) && (
                <div className="flex gap-4 mt-2">
                    {s.Focus !== "Rest Day" && (
                        <button
                            className="bg-white text-lg hover:bg-amber-100 border border-amber-500 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setLiftInput(s.Day)}
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

            {/* --- Lift Input (below buttons, appears only when adding) --- */}
            {liftInput === s.Day && (
                <div className="flex flex-col gap-4 items-center justify-center">
                    <label htmlFor="lift-input" className="text-lg">
                        Enter Exercise:
                    </label>
                    <input
                        id="lift-input"
                        type="text"
                        value={pendingLift}
                        onChange={(e) => setPendingLift(e.target.value)}
                        className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                    />
                    <div className="flex gap-4">
                        <button
                            className="bg-white hover:bg-sky-100 border border-sky-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => {
                                if (!pendingLift.trim()) return setWarningMessage("lift");
                                setSchedules(
                                    schedules.map((d) =>
                                        d.Day === s.Day
                                            ? { ...d, Lifts: [...d.Lifts, pendingLift] }
                                            : d
                                    )
                                );
                                setPendingLift("");
                                setLiftInput(null);
                                setWarningMessage(null);
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-white hover:bg-red-100 border border-red-400 transition-colors duration-200 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => {
                                setPendingLift("");
                                setLiftInput(null);
                                setWarningMessage(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                    {warningMessage === "lift" && (
                        <p className="text-lg text-red-600 text-center">
                            Please type a lift/exercise
                        </p>
                    )}
                </div>
            )}

            {/* --- Lift Delete Modal --- */}
            {showModal.Type === "lift" && showModal.Day === s.Day && (
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
                                        Lifts: d.Lifts.filter(
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