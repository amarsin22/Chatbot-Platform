const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

console.log("🔑 OPENROUTER KEY PRESENT:", Boolean(process.env.OPENROUTER_API_KEY))

connectDB()

const app = express()

app.use(cors({ origin: ["http://localhost:5173", "https://chatbot-platform-hk6l.vercel.app/"] }))
app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/projects", require("./routes/project.routes"))
app.use("/api/chat", require("./routes/chat.routes"))

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
