import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ✅ VALID CHAT ROUTE */}
      <Route path="/chat/:projectId" element={<Chat />} />

      {/* ✅ SAFETY REDIRECT */}
      <Route path="/chat" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
