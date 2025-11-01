const express = require("express")
const route = express.Router()
const PaymentController = require("../controllers/paymentController")

route.get('/', PaymentController.getAll)
route.get('/:id', PaymentController.getById)
route.post('/', PaymentController.create)
route.delete('/:id', PaymentController.delete)
route.put('/:id', PaymentController.update)

module.exports = route