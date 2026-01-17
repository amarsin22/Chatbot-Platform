import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessToast({
  show,
  message,
  duration = 2500,
  onClose,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed top-6 right-6 z-50"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
        <CheckCircle size={18} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
