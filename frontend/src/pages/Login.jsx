import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import Toast from "../components/Toast"
import api from "../services/api"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setToast({ type: "error", message: "All fields are required" })
      return
    }

    try {
      setLoading(true)
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)

      setToast({ type: "success", message: "Login successful 🎉" })

      setTimeout(() => navigate("/dashboard"), 800)
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Login failed",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Login to your Chatbot Platform"
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
