const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,

    // ⭐ NEW
    isPinned: {
      type: Boolean,
      default: false,
    },

    systemPrompt: {
      type: String,
      default: "You are a helpful AI assistant.",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", projectSchema)
