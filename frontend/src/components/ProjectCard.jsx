import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function ProjectCard({
  id,
  title,
  description,
  isPinned = false,
  onUpdated,
}) {
  const navigate = useNavigate()

  const togglePin = async (e) => {
    e.stopPropagation()
    await api.put(`/projects/${id}/pin`)
    onUpdated?.()
  }

  return (
    <div
      onClick={() => navigate(`/chat/${id}`)}
      className="group bg-white border border-gray-200 rounded-xl p-4
                 cursor-pointer transition-all duration-200
                 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <button onClick={togglePin}>
          <Star
            size={18}
            className={`transition-colors ${
              isPinned
                ? "text-yellow-500"
                : "text-gray-300 group-hover:text-yellow-500"
            }`}
          />
        </button>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {description || "No description provided"}
      </p>

      <div className="flex justify-between text-xs text-gray-400">
        <span>AI Project</span>
        <span className="text-blue-600 font-medium">
          Open →
        </span>
      </div>
    </div>
  )
}
