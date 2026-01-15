import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import api from "../services/api"

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [projects, setProjects] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  // 🔄 Load projects for chat list
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects")
        setProjects(res.data)
      } catch (err) {
        console.error("Sidebar projects failed")
      }
    }
    loadProjects()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0
          ${collapsed ? "w-16" : "w-64"}
          bg-slate-900 text-white
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed && (
            <h1 className="font-semibold text-lg truncate">
              Chatbot Platform
            </h1>
          )}

          <button
            onClick={() => setCollapsed((p) => !p)}
            className="hidden lg:block text-white/70 hover:text-white"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Projects"
            collapsed={collapsed}
            active={location.pathname.startsWith("/dashboard")}
            onClick={() => navigate("/dashboard")}
          />

          {/* Divider */}
          {!collapsed && (
            <div className="text-xs text-white/40 px-3 mt-4 mb-1">
              Chats
            </div>
          )}

          {/* Chat List */}
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {projects.map((project) => (
              <SidebarChatItem
                key={project._id}
                project={project}
                collapsed={collapsed}
                active={location.pathname === `/chat/${project._id}`}
              />
            ))}
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-semibold">Chatbot</span>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

/* ---------------- Sidebar Items ---------------- */

function SidebarItem({ icon, label, collapsed, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm
        ${active ? "bg-white/15" : "hover:bg-white/10"}
      `}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  )
}

function SidebarChatItem({ project, collapsed, active }) {
  return (
    <NavLink
      to={`/chat/${project._id}`}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md text-sm truncate
        ${active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"}
      `}
    >
      <MessageSquare size={14} />
      {!collapsed && (
        <span className="truncate">{project.name}</span>
      )}
    </NavLink>
  )
}
