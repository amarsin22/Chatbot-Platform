const Chat = require("../models/chat")
const axios = require("axios")

/**
 * POST /api/chat
 * Send message to AI and save chat
 */
exports.sendMessage = async (req, res) => {
  try {
    const { projectId, message } = req.body

    // 🚨 HARD VALIDATION
    if (
      !projectId ||
      projectId === "undefined" ||
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({ message: "Invalid request data" })
    }

    const cleanUserMessage = message.trim()

    // 1️⃣ Save USER message (guaranteed non-empty)
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
        content: msg.content || "",
      }))
      .filter((m) => m.content.trim())

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

    // 🚨 ABSOLUTE FALLBACK
    if (!aiReply) {
      aiReply = "Sorry, I couldn't generate a response."
    }

    // 4️⃣ CLEAN AI RESPONSE (🔥 EMOJI + JUNK REMOVAL)
    aiReply = aiReply
      // remove html-like tags
      .replace(/<[^>]*>/g, "")
      // remove assistant markers
      .replace(/\[(ASSISTANT|SYSTEM|USER)\]/gi, "")
      // 🔥 REMOVE ALL EMOJIS (Unicode-safe)
      .replace(
        /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
        ""
      )
      // remove extra spaces
      .replace(/\s{2,}/g, " ")
      .trim()

    // 5️⃣ Save ASSISTANT message (guaranteed non-empty)
    const assistantMessage = await Chat.create({
      projectId,
      role: "assistant",
      content: aiReply,
    })

    return res.json(assistantMessage)
  } catch (error) {
    console.error("Chat Error:", error?.response?.data || error)
    return res.status(500).json({ message: "AI response failed" })
  }
}

/**
 * GET /api/chat/:projectId
 * Fetch chat history
 */
exports.getChatHistory = async (req, res) => {
  try {
    const { projectId } = req.params

    if (!projectId || projectId === "undefined") {
      return res.status(400).json({ message: "Invalid projectId" })
    }

    const chats = await Chat.find({ projectId }).sort({
      createdAt: 1,
    })

    return res.json(chats)
  } catch (error) {
    console.error("Chat History Error:", error)
    return res
      .status(500)
      .json({ message: "Failed to fetch chat history" })
  }
}
