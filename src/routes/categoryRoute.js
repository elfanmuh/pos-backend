const express = require('express')
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const CategoryController = require('../controllers/categoryController')

router.get('/', verifyToken, CategoryController.getAll)
router.get('/:id', verifyToken, CategoryController.getById)
router.post('/', verifyToken, CategoryController.create)
router.put('/:id', verifyToken, CategoryController.update)
router.delete('/:id', verifyToken, CategoryController.delete)

module.exports = router