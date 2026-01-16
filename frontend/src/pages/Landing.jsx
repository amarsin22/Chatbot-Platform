import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { Sparkles, MessageSquare, Lock } from "lucide-react"

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🎥 VIDEO / GRID BACKGROUND */}
      <AnimatedBackground />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-20 backdrop-blur-xl bg-black/30 border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-wide">
              Chatbot Platform
            </h1>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm text-white/80 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium shadow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* 🔥 PARALLAX HERO */}
        <ParallaxHero />

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Feature
              icon={<MessageSquare />}
              title="Multi-Project Chat"
              desc="Organize AI conversations by projects with ease."
            />
            <Feature
              icon={<Sparkles />}
              title="Smart AI Responses"
              desc="Powered by modern large language models."
            />
            <Feature
              icon={<Lock />}
              title="Secure Platform"
              desc="Authentication-based access with protected data."
            />
          </motion.div>
        </section>
      </div>
    </div>
  )
}

/* ---------------- PARALLAX HERO ---------------- */

function ParallaxHero() {
  const { scrollY } = useScroll()

  const headingY = useTransform(scrollY, [0, 300], [0, -80])
  const textY = useTransform(scrollY, [0, 300], [0, -40])
  const buttonY = useTransform(scrollY, [0, 300], [0, -20])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.85])

  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
      <motion.h2
        style={{ y: headingY, opacity }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
      >
        Build Powerful <br />
        <span className="text-blue-500">AI Chat Projects</span>
      </motion.h2>

      <motion.p
        style={{ y: textY, opacity }}
        className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg"
      >
        Create, manage, and interact with AI chatbots across multiple
        projects — all in one elegant platform.
      </motion.p>

      <motion.div
        style={{ y: buttonY, opacity }}
        className="mt-10 flex justify-center gap-4 flex-wrap"
      >
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl font-medium shadow-lg"
        >
          Start Free
        </Link>

        <Link
          to="/login"
          className="border border-white/20 hover:bg-white/10 transition px-8 py-3 rounded-xl font-medium"
        >
          Login
        </Link>
      </motion.div>
    </section>
  )
}

/* ---------------- FEATURE CARD ---------------- */

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
    >
      <div className="mb-4 text-blue-500">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </motion.div>
  )
}

/* ---------------- 🎥 VIDEO / GRID BACKGROUND ---------------- */

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
      {/* Animated gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-500/20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "300% 300%" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating light blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[140px]"
        animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
