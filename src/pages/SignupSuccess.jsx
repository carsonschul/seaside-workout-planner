import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function SignupSuccess() {
    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center p-12 gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300">
            <h1 className="text-6xl text-red-600 text-shadow-lg font-bold">Account Created!</h1>
            <p className="text-lg text-center">Your account was created successfully.</p>
            <Link to="/login">
                <Button variant="sky">Go to Log In</Button>
            </Link>
        </div>
    );
}