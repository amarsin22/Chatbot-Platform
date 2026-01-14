import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function ProjectCard({ id, title, description, isPinned }) {
  const navigate = useNavigate()

  const togglePin = async (e) => {
    e.stopPropagation() // ✅ prevent card click
    try {
      await api.put(`/projects/${id}/pin`)
    } catch (err) {
      console.error("Pin failed", err.response?.data)
    }
  }

  return (
    <div
      onClick={() => navigate(`/chat/${id}`)} // ✅ CARD CLICK
      className="bg-white p-4 rounded shadow relative cursor-pointer hover:shadow-md transition"
    >
      {/* ⭐ Pin Button */}
      <button
        onClick={togglePin}
        className={`absolute top-2 right-2 text-lg ${
          isPinned ? "text-yellow-500" : "text-gray-400"
        }`}
        title="Pin project"
      >
        ⭐
      </button>

      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
