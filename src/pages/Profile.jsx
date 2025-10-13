import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center p-12 gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300">
            <h1 className="text-5xl text-red-600 text-shadow-lg font-bold">
                Welcome to your profile!
            </h1>
            <p className="text-lg text-center">
                This is where your saved plans and account info will go.
            </p>
            <Link to="/planner">
                <Button variant="sky">Go to Planner</Button>
            </Link>
        </div>
    );
}