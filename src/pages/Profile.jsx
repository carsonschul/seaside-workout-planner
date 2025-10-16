import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);

    // 🔹 Fetch user’s plans when profile loads
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        async function fetchPlans() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plans`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setPlans(data.plans || []);
            } catch (err) {
                console.error("Error loading plans:", err);
            }
        }

        fetchPlans();
    }, [navigate]);

    // 🔹 Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center p-12 gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300">
            <h1 className="text-5xl text-red-600 font-bold">Welcome to your Profile!</h1>

            <div className="flex gap-4">
                <Link to="/planner">
                    <Button variant="sky">➕ Create New Plan</Button>
                </Link>
                <Button variant="amber" onClick={handleLogout}>
                    🚪 Log Out
                </Button>
            </div>

            <div className="mt-10 w-full max-w-md">
                <h2 className="text-2xl text-red-600 mb-4 text-center">Your Saved Plans</h2>
                {plans.length === 0 ? (
                    <p className="text-center text-gray-600">No plans yet — create one in the planner!</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {plans.map((p) => (
                            <li
                                key={p.id}
                                className="flex justify-between items-center bg-white shadow-md p-4 rounded border border-gray-300"
                            >
                                <span className="font-semibold text-lg">{p.name}</span>
                                <div className="flex gap-2">
                                    <Link to={`/planner?planId=${p.id}`}>
                                        <Button variant="sky">Load</Button>
                                    </Link>
                                    <Button
                                        variant="red"
                                        onClick={async () => {
                                            const token = localStorage.getItem("token");
                                            await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/plan/${p.id}`, {
                                                method: "DELETE",
                                                headers: { Authorization: `Bearer ${token}` },
                                            });
                                            setPlans((prev) => prev.filter((x) => x.id !== p.id));
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
