import Button from "../components/Button";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-white border border-black rounded-lg shadow-2xl p-8 flex flex-col gap-4 max-w-[90vw]">
                <p className="text-lg text-center">{message}</p>
                <div className="flex gap-4 justify-center">
                    <Button variant="sky" onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button variant="red" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
