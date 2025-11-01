const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const OrderController = require("../controllers/orderController")

router.get('/', verifyToken, OrderController.getAll)
router.get('/:id', verifyToken, OrderController.getById)
router.post('/', verifyToken, OrderController.create)
router.put('/:id', verifyToken, OrderController.update)
router.delete('/:id', verifyToken, OrderController.delete)

module.exports = router