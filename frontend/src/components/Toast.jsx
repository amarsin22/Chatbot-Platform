import { CheckCircle, XCircle, Info, X } from "lucide-react"
import { useEffect } from "react"

export default function Toast({
  message,
  type = "success", // success | error | info
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  }

  const Icon =
    type === "success"
      ? CheckCircle
      : type === "error"
      ? XCircle
      : Info

  return (
    <div
      className={`
        fixed top-6 right-6 z-50
        flex items-center gap-3
        text-white px-4 py-3 rounded-xl shadow-xl
        animate-slide-in
        ${styles[type]}
      `}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{message}</span>

      <button onClick={onClose}>
        <X size={16} className="opacity-80 hover:opacity-100" />
      </button>
    </div>
  )
}
