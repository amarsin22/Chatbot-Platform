import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProjectCard({
  id,
  title,
  description,
  isPinned = false,
}) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/chat/${id}`)}
      className="
        group bg-white border border-gray-200 rounded-xl p-4
        cursor-pointer transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        active:scale-[0.98]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <Star
          size={18}
          className={`
            transition-transform duration-300
            ${isPinned ? "text-yellow-500 scale-110" : "text-gray-300"}
            group-hover:rotate-12
          `}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {description || "No description provided"}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Updated recently</span>
        <span className="text-blue-600 font-medium">
          Open →
        </span>
      </div>
    </div>
  )
}
