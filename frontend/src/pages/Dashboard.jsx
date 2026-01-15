import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import CreateProjectModal from "../components/CreateProjectModal"
import ProjectCard from "../components/ProjectCard"
import api from "../services/api"
import { Search, Plus } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // 🔐 Auth guard
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) navigate("/")
  }, [navigate])

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const res = await api.get("/projects")
      setProjects(res.data)
    } catch {
      setError("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const filteredProjects = projects
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Projects
            </h1>
            <p className="text-sm text-gray-500">
              Manage and chat with your AI projects
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              <Plus size={16} />
              New Project
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm border text-gray-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            value={search}
            disabled={loading}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* STATES */}
        {loading && <p className="text-gray-500">Loading projects...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm">Create your first AI project</p>
          </div>
        )}

        {/* PROJECT GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.name}
              description={project.description}
              isPinned={project.isPinned}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={fetchProjects}
        />
      )}
    </DashboardLayout>
  )
}
