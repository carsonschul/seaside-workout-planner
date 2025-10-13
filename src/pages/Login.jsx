import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Login failed");

            navigate("/profile");
        } catch (err) {
            setMessage("❌ Something went wrong. Try again.");
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center p-12 gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300">
            <h1 className="text-6xl text-red-600 text-shadow-lg">Log In</h1>

            <div className="flex gap-4 items-center">
                <label htmlFor="email-input" className="text-lg">
                    Enter email:
                </label>
                <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                />
            </div>

            <div className="flex gap-4 items-center">
                <label htmlFor="password-input" className="text-lg">
                    Enter password:
                </label>
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white text-lg hover:bg-gray-100 border border-gray-400 transition-colors duration-200 px-4 py-2 rounded-lg shadow-lg"
                />
            </div>

            <Button variant="sky" onClick={handleLogin}>
                Log In
            </Button>

            {message && <p className="text-lg">{message}</p>}
        </div>
    );
}