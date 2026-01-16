import { motion, AnimatePresence } from "framer-motion"

export default function LogoutConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Logout Confirmation
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to logout from the platform?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
