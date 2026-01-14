const Project = require("../models/Project")

// ➕ Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description, systemPrompt } = req.body

    if (!name) {
      return res.status(400).json({ message: "Project name is required" })
    }

    const project = await Project.create({
      user: req.user.id,
      name,
      description,
      systemPrompt: systemPrompt || "You are a helpful AI assistant.",
      isPinned: false,
    })

    res.status(201).json(project)
  } catch (error) {
    console.error("Create Project Error:", error)
    res.status(500).json({ message: "Failed to create project" })
  }
}

// 📄 Get Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      isPinned: -1,
      createdAt: -1,
    })
    res.json(projects)
  } catch (error) {
    console.error("Get Projects Error:", error)
    res.status(500).json({ message: "Failed to load projects" })
  }
}

// ✏️ Update Project
exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, description },
      { new: true }
    )

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" })
  }
}

// 🗑 Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json({ message: "Project deleted" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" })
  }
}

// ⭐ TOGGLE PIN (THIS WAS MISSING / WRONG)
exports.togglePinProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    project.isPinned = !project.isPinned
    await project.save()

    res.json(project)
  } catch (error) {
    console.error("Toggle Pin Error:", error)
    res.status(500).json({ message: "Failed to pin project" })
  }
}
