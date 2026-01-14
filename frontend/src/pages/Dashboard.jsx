import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import CreateProjectModal from "../components/CreateProjectModal"
import ProjectCard from "../components/ProjectCard"
import api from "../services/api"

export default function Dashboard() {
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
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

  // 🔍 Filtered projects
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Projects</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              + Create Project
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/")
              }}
              className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* States */}
        {loading && <p className="text-gray-500">Loading projects...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && filteredProjects.length === 0 && (
          <p className="text-gray-500">No matching projects found.</p>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
