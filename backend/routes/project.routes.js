const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth.middleware")
const projectController = require("../controllers/project.controller")

router.post("/", auth, projectController.createProject)
router.get("/", auth, projectController.getProjects)
router.put("/:id", auth, projectController.updateProject)
router.delete("/:id", auth, projectController.deleteProject)
router.put("/:id/pin", auth, projectController.togglePinProject)

module.exports = router
