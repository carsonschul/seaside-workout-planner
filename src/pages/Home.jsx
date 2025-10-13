import { Link } from "react-router-dom"
import Button from "../components/Button";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-8 bg-gradient-to-b from-gray-300 via-white to-gray-300">
            <h1 className="text-6xl text-red-600 text-shadow-lg">Welcome to the SHS Workout Planner</h1>
            <img src="https://imgs.search.brave.com/8vQ_5c4p_0q9390K0GTH9ePjWyFmcFbW9TQ4SMeS_TA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L3BzLWZlZWRzLXBy/b2R1Y3Rpb24vaW5s/aW5lX2ltYWdlc18x/NzIzNTc0NTMwODM3/LVMrTG9nbytSZWQr/Tm8rQmFja2dyb3Vu/ZC5wbmc"
                className="h-auto max-w-[5%]" />
            <p className="text-2xl text-red-600">Warning! Accounts are currently under construction! Use the "Planner Demo" button to try the planner demo.</p>
            <div className="flex gap-4">
                <Link to="/login">
                    <Button variant="red">Log In</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="sky">Sign Up</Button>
                </Link>
            </div>
            <Link to="/planner">
                <Button variant="amber">Planner Demo</Button>
            </Link>
        </div>
    )
}