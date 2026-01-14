const Chat = require("../models/chat")
const axios = require("axios")

exports.sendMessage = async (req, res) => {
  try {
    const { projectId, message } = req.body

    // ✅ HARD VALIDATION (NO EMPTY STRINGS)
    if (
      !projectId ||
      projectId === "undefined" ||
      !message ||
      !message.trim()
    ) {
      return res.status(400).json({ message: "Invalid request data" })
    }

    const cleanUserMessage = message.trim()

    // 1️⃣ Save user message (GUARANTEED NON-EMPTY)
    await Chat.create({
      projectId,
      role: "user",
      content: cleanUserMessage,
    })

    // 2️⃣ Fetch last 6 messages for context
    const history = await Chat.find({ projectId })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()

    const messages = history
      .reverse()
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

    // 3️⃣ Call OpenRouter
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    let aiReply =
      response?.data?.choices?.[0]?.message?.content?.trim()

    // 🚨 ABSOLUTE SAFETY CHECK
    if (!aiReply) {
      aiReply = "Sorry, I couldn't generate a response."
    }

    // 4️⃣ Clean AI response
    aiReply = aiReply
      .replace(/<\s*\/?\s*s\s*>/gi, "")
      .replace(/\[\/?s\]/gi, "")
      .replace(/\[ASSISTANT\]/gi, "")
      .trim()

    // 5️⃣ Save assistant message (GUARANTEED NON-EMPTY)
    const assistantMessage = await Chat.create({
      projectId,
      role: "assistant",
      content: aiReply,
    })

    res.json(assistantMessage)
  } catch (error) {
    console.error("Chat Error:", error)
    res.status(500).json({ message: "AI response failed" })
  }
}

exports.getChatHistory = async (req, res) => {
  try {
    const { projectId } = req.params

    if (!projectId || projectId === "undefined") {
      return res.status(400).json({ message: "Invalid projectId" })
    }

    const chats = await Chat.find({ projectId }).sort({ createdAt: 1 })
    res.json(chats)
  } catch (error) {
    console.error("Chat History Error:", error)
    res.status(500).json({ message: "Failed to fetch chat history" })
  }
}
