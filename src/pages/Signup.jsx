import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/profile");
    }, [navigate]);

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Signup failed");

            navigate("/signup-success");
        } catch (err) {
            setMessage("❌ Something went wrong. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center p-6 sm:p-12 gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300 text-center">
            <h1 className="text-4xl sm:text-6xl text-red-600 text-shadow-lg">Sign Up</h1>

            <Button variant="amber" onClick={() => navigate("/")}>
                ⬅ Return to Home
            </Button>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full max-w-2xl px-4">
                <label htmlFor="email-input" className="text-lg sm:w-48 text-left sm:text-right">
                    Enter email:
                </label>
                <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    placeholder="you@example.com"
                    className="flex-1 bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg w-full"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full max-w-2xl px-4">
                <label htmlFor="password-input" className="text-lg sm:w-48 text-left sm:text-right">
                    Enter password:
                </label>
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg w-full"
                />
            </div>

            <Button variant="sky" onClick={handleSignup} disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
            </Button>

            {message && <p className="text-lg">{message}</p>}
        </div>
    );
}
