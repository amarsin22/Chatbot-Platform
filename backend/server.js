const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()

// ✅ CORRECT CORS CONFIG (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://chatbot-platform-hk6l.vercel.app", // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
)

app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/projects", require("./routes/project.routes"))
app.use("/api/chat", require("./routes/chat.routes"))

app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
