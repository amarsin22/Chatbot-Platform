import { useState } from "react"
import {
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)          // mobile
  const [collapsed, setCollapsed] = useState(false) // desktop

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
          bg-gradient-to-b from-slate-900 to-slate-800 text-white
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed && (
            <h1 className="text-lg font-semibold tracking-wide truncate">
              Chatbot Platform
            </h1>
          )}

          {/* Desktop collapse button */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="hidden lg:block text-white/70 hover:text-white"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Projects"
            collapsed={collapsed}
          />

          <NavItem
            icon={<MessageSquare size={18} />}
            label="Chats"
            collapsed={collapsed}
          />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-semibold">Projects</span>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

/* ---------------- Nav Item ---------------- */

function NavItem({ icon, label, collapsed }) {
  return (
    <button
      className="
        flex items-center gap-3 w-full
        px-3 py-2 rounded-md
        hover:bg-white/10
        transition-colors
        text-sm
      "
    >
      <span className="min-w-[20px]">{icon}</span>

      {/* Smooth label animation */}
      <span
        className={`
          transition-all duration-300
          ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
        `}
      >
        {label}
      </span>
    </button>
  )
}
