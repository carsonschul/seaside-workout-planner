import ConfirmModal from "../components/ConfirmModal.jsx";
import Button from "../components/Button";

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
        <div className="flex flex-col items-center width-full md:w-1/2 bg-white border-3 border-amber-400 rounded-3xl shadow-lg overflow-hidden">
            <h2 className="text-3xl text-center text-white text-shadow-lg font-bold p-4 bg-gradient-to-r from-sky-300 to-sky-400 border-b-3 border-amber-400 w-full">
                Instructions:
            </h2>

            <p className="text-lg text-center p-8">
                Begin by selecting a muscle focus for each day to create your workout split. Alternatively, you can select from a list of preset splits below.
            </p>

            {!showSplitDropdown && (
                <div className="flex gap-4 pb-4 bg-white w-full items-center justify-center">
                    <Button
                        variant="sky"
                        onClick={() => {
                            setShowSplitDropdown(true);
                            setShowFocusDropdown(false);
                        }}
                    >
                        Use a preset split
                    </Button>

                    {schedules.some((s) => s.Focus) && (
                        <Button
                            variant="red"
                            onClick={() => setShowModal({ Type: "plan", Day: null })}
                        >
                            Clear plan
                        </Button>
                    )}
                </div>
            )}

            {showModal.Type === "plan" && (
                <ConfirmModal
                    message={<>Are you sure you want to clear your plan?</>}
                    onConfirm={() => {
                        setSchedules(
                            schedules.map((s) => ({ ...s, Focus: "", Exercises: [] }))
                        );
                        setShowModal({ Type: null, Day: null });
                    }}
                    onCancel={() => setShowModal({ Type: null, Day: null })}
                />
            )}

            {showSplitDropdown && (
                <div className="flex flex-col gap-4 pb-4 bg-white w-full items-center justify-center">
                    <select
                        className="bg-white text-lg hover:bg-gray-100 border-2 border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                        value={pendingSplit}
                        onChange={(e) => setPendingSplit(e.target.value)}
                    >
                        <option value="" disabled>
                            Choose a split:
                        </option>
                        {Object.keys(splitSchedules).map((split) => (
                            <option key={split} value={split}>
                                {split}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-4">
                        <Button
                            variant="sky"
                            onClick={() => {
                                if (pendingSplit === "") {
                                    setWarningMessage("split");
                                } else {
                                    setShowSplitDropdown(false);
                                    setSchedules(
                                        schedules.map((s) => ({
                                            ...s,
                                            Focus:
                                                splitSchedules[pendingSplit].find(
                                                    (d) => d.Day === s.Day
                                                )?.Muscle || "",
                                        }))
                                    );
                                    setPendingSplit("");
                                    setWarningMessage(null);
                                }
                            }}
                        >
                            Confirm
                        </Button>

                        <Button
                            variant="red"
                            onClick={() => {
                                setShowSplitDropdown(false);
                                setPendingSplit("");
                                setWarningMessage(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>

                    {warningMessage === "split" && (
                        <p className="text-lg text-red-600 text-center">
                            Please choose a split
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
