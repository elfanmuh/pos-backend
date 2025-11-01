const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const ItemController = require("../controllers/itemController")

router.get("/", verifyToken, ItemController.getAll)
router.get("/:id", verifyToken, ItemController.getById)
router.post("/", verifyToken, ItemController.create)
router.put("/:id", verifyToken, ItemController.update)
router.delete("/:id", verifyToken, ItemController.delete)

module.exports = router
