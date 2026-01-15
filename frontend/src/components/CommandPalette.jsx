import { useEffect, useState } from "react"
import { Search, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CommandPalette({ projects, onCreate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen((p) => !p)
      }
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (!open) return null

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <Search size={18} className="text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or actions…"
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          <button
            onClick={() => {
              setOpen(false)
              onCreate()
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Plus size={16} />
            Create new project
          </button>

          {filtered.map((project) => (
            <button
              key={project._id}
              onClick={() => {
                setOpen(false)
                navigate(`/chat/${project._id}`)
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
