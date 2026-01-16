import { motion } from "framer-motion"

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl 
        rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        {children}
      </motion.div>
    </div>
  )
}
