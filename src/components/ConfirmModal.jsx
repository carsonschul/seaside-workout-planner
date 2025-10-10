export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-white border border-black rounded-lg shadow-2xl p-8 flex flex-col gap-4 max-w-[90vw]">
                <p className="text-lg text-center">{message}</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onConfirm}
                        className="text-white text-shadow-lg bg-sky-400 hover:bg-sky-500 border-2 border-sky-600 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-colors duration-200"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="text-white text-shadow-lg bg-red-400 hover:bg-red-500 border-2 border-red-600 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}