import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"

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
  }, [messages])

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

  // 📤 Send message (NON-STREAMING, STABLE)
  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()

    // Optimistic UI
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

  // 📅 Render with date separators
  let lastDate = ""

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 text-sm"
        >
          ← Projects
        </button>
        <h2 className="font-semibold truncate">Project Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
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

              <div
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
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="bg-white text-gray-400 px-4 py-2 rounded-2xl w-fit shadow italic text-sm">
            AI is typing…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t px-3 py-2">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 border rounded-full px-4 py-2 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
