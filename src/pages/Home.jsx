import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-8 gap-6 bg-gradient-to-b from-gray-300 via-white to-gray-300 text-center">

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-600 text-shadow-lg leading-tight">
                Welcome to the SHS Workout Planner
            </h1>

            <img
                src="https://imgs.search.brave.com/8vQ_5c4p_0q9390K0GTH9ePjWyFmcFbW9TQ4SMeS_TA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L3BzLWZlZWRzLXBy/b2R1Y3Rpb24vaW5s/aW5lX2ltYWdlc18x/NzIzNTc0NTMwODM3/LVMrTG9nbytSZWQr/Tm8rQmFja2dyb3Vu/ZC5wbmc"
                alt="SHS Logo"
                className="w-20 sm:w-24 md:w-28 h-auto"
            />

            <p className="text-lg sm:text-xl md:text-2xl text-red-600 max-w-xl">
                Create an account to save your workout plans. You can also try out the planner using the “Planner Demo” button below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
                <Link to="/login" className="w-full sm:w-auto">
                    <Button variant="red" className="w-full sm:w-auto">
                        Log In
                    </Button>
                </Link>
                <Link to="/signup" className="w-full sm:w-auto">
                    <Button variant="sky" className="w-full sm:w-auto">
                        Sign Up
                    </Button>
                </Link>
            </div>

            <div className="mt-2 w-full sm:w-auto">
                <Link to="/planner" className="w-full sm:w-auto">
                    <Button variant="amber" className="w-full sm:w-auto">
                        Planner Demo
                    </Button>
                </Link>
            </div>
        </div>
    );
}
