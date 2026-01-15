import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import api from "../services/api"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Toast from "../components/Toast"

export default function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    // ✅ Strong frontend validation
    if (!email || !password) {
      setError("All fields are required")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      setLoading(true)

      // 🔍 DEBUG (you can remove later)
      console.log("REGISTER DATA:", { email, password })

      await api.post("/auth/register", {
        email,
        password,
      })

      // ✅ Success toast
      setToast({
        type: "success",
        message: "Account created successfully 🎉",
      })

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/")
      }, 1200)
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <AuthLayout
        title="Create your account 🚀"
        subtitle="Start building your AI chatbot projects"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-2 rounded">
              {error}
            </div>
          )}

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
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <Loader2 size={16} className="animate-spin" />
            )}
            Create Account
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  )
}
