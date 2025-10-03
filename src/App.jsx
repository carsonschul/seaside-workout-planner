import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Planner from "./pages/Planner"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Planner />} />
      </Routes>
    </div>
  )
}