import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import AuthLayout from "../components/AuthLayout"
import api from "../services/api"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to your AI Chatbot Platform"
    >
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {error && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-red-50 text-red-600 text-sm p-2 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm 
          focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm 
            focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg 
          text-sm font-semibold hover:bg-indigo-700 
          disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Login
        </motion.button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  )
}
