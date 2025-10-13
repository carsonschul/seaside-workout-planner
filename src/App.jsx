import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SignupSuccess from "./pages/SignupSuccess";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}