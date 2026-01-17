import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", { email, password });

      // ✅ PASS REGISTER SUCCESS STATE
      navigate("/login", {
        state: { registerSuccess: true },
        replace: true,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account 🚀"
      subtitle="Start building AI chat projects"
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
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Register
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
