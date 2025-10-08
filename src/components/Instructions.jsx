import ConfirmModal from "../components/ConfirmModal.jsx";
export default function Instructions({
    showSplitDropdown,
    setShowSplitDropdown,
    setShowFocusDropdown,
    showModal,
    setShowModal,
    schedules,
    setSchedules,
    pendingSplit,
    setPendingSplit,
    splitSchedules,
    warningMessage,
    setWarningMessage,
}) {
    return (
        <div
            className="flex flex-col items-center w-1/2 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 rounded-xl p-4 gap-4 shadow-lg">
            <h2
                className="text-3xl text-center font-bold">Instructions:</h2>
            <p
                className="text-lg text-center">Begin by selecting a muscle focus for each day to create your workout split. Alternatively, you can select from a list of preset splits below.</p>
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
                <ConfirmModal
                    message={
                        <>
                            Are you sure you want to clear your plan?
                        </>
                    }
                    onConfirm={() => {
                        setSchedules(schedules.map(s => (
                            { ...s, Focus: "", Exercises: [] }
                        )));
                        setShowModal({ Type: null, Day: null });
                    }}
                    onCancel={() => setShowModal({ Type: null, Day: null })}
                />
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
    )
}