const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")

const {
  sendMessage,
  getChatHistory,
} = require("../controllers/chat.controller")

// 💬 Send message to AI
router.post("/", auth, sendMessage)

// 📜 Get chat history by project
router.get("/:projectId", auth, getChatHistory)

module.exports = router
