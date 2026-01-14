import { useState } from "react"
import api from "../services/api"

export default function EditPromptModal({
  projectId,
  currentPrompt,
  onClose,
  onUpdated,
}) {
  const [prompt, setPrompt] = useState(currentPrompt)
  const [loading, setLoading] = useState(false)

  const savePrompt = async () => {
    try {
      setLoading(true)
      await api.put(`/projects/${projectId}/prompt`, {
        systemPrompt: prompt,
      })
      onUpdated(prompt)
      onClose()
    } catch {
      alert("Failed to update system prompt")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded">
        <h3 className="text-lg font-semibold mb-3">
          Edit AI System Prompt
        </h3>

        <textarea
          className="w-full border p-2 rounded h-40"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={savePrompt}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
