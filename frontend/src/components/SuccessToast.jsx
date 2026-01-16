import { CheckCircle } from "lucide-react"

export default function SuccessToast({ show, message }) {
  if (!show) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
        <CheckCircle size={18} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
