export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-white border border-black rounded-lg shadow-2xl p-8 flex flex-col gap-4">
                <p className="text-lg text-center">{message}</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onConfirm}
                        className="bg-white hover:bg-sky-100 border border-sky-400 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-colors duration-200"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-white hover:bg-red-100 border border-red-400 text-lg px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-colors duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}