import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { motion, AnimatePresence } from "framer-motion"

export default function Chat() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const bottomRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  // 🚫 Guard
  useEffect(() => {
    if (!projectId || projectId === "undefined") {
      navigate("/dashboard")
    }
  }, [projectId, navigate])

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // 📩 Load chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/chat/${projectId}`)
        setMessages(res.data)
      } catch {
        console.error("Failed to load chat history")
      }
    }

    fetchHistory()
  }, [projectId])

  // 🕒 Helpers
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

  const getDateLabel = (date) => {
    const msgDate = new Date(date)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (msgDate.toDateString() === today.toDateString()) return "Today"
    if (msgDate.toDateString() === yesterday.toDateString())
      return "Yesterday"

    return msgDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // 📤 Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()

    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        role: "user",
        content: userMessage,
        createdAt: new Date(),
      },
    ])

    setInput("")
    setLoading(true)

    try {
      const res = await api.post("/chat", {
        projectId,
        message: userMessage,
      })

      setMessages((prev) => [...prev, res.data])
    } catch (err) {
      console.error("Message send failed", err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  // 📅 Date separator helper
  let lastDate = ""

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 text-sm hover:underline"
        >
          ← Projects
        </button>
        <h2 className="font-semibold truncate">Project Chat</h2>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const dateLabel = getDateLabel(msg.createdAt)
            const showDate = dateLabel !== lastDate
            lastDate = dateLabel

            return (
              <div key={msg._id || index}>
                {showDate && (
                  <div className="text-center text-xs text-gray-500 my-3">
                    {dateLabel}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] md:max-w-[60%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow"
                  }`}
                >
                  {msg.content}
                  <div className="text-[10px] text-right opacity-70 mt-1">
                    {formatTime(msg.createdAt)}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white text-gray-400 px-4 py-2 rounded-2xl w-fit shadow italic text-sm"
          >
            AI is typing…
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 bg-white border-t px-3 py-2">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
