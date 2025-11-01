const express = require("express")
const { verifyToken } = require("../middlewares/authMiddleware")
const authController = require("../controllers/authController")

const router = express.Router()

router.get("/profile", verifyToken, authController.profile)
router.post("/login", authController.login)
router.post("/register", authController.register)

module.exports = router