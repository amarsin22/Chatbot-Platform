import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import SuccessToast from "../components/SuccessToast";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  /* ✅ REGISTER SUCCESS TOAST */
  useEffect(() => {
    if (location.state?.registerSuccess) {
      setToastMessage("Registration successful 🎉 Please login");
      setShowToast(true);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", {
        state: { loginSuccess: true },
        replace: true,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to your AI Chatbot Platform"
    >
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
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

      {/* ✅ SUCCESS TOAST */}
      <SuccessToast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </AuthLayout>
  );
}
