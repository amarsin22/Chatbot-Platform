const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")

const {
  sendMessage,
  getChatHistory,
} = require("../controllers/chat.controller")

// Send message
router.post("/", auth, sendMessage)

// Get chat history
router.get("/:projectId", auth, getChatHistory)

module.exports = router
