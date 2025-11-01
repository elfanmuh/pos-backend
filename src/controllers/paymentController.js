const prisma = require("../config/connection")
const orderController = require("./orderController")

const PaymentController = {
    getAll: async (req, res) => {
        try {
            const payments = await prisma.payment.findMany({
                include: {
                    order: {
                        include: { orderitem: { include: { item: true } } }
                    }
                }
            })
            res.json({ success: true, data: payments, message: "Get all payments" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID Format" })
            }
            const payment = await prisma.payment.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    order: {
                        include: { orderitem: { include: { item: true } } }
                    }
                }
            })
            if (!payment) return res.status(404).json({ success: false, message: "Payment not Found" })
            res.json({ sucess: true, data: payment, message: "Get payment" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const { payment_method, order_id } = req.body
            const findOrder = await prisma.orders.findUnique({
                where: {
                    id: parseInt(order_id)
                },
                select: {
                    id: true,
                    total_amount: true
                }
            })
            console.log(findOrder)
            const transaction_id = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            const createPayment = await prisma.payment.create({
                data: {
                    order_id: findOrder.id,
                    transaction_id: transaction_id,
                    payment_method: payment_method,
                    amount: findOrder.total_amount,
                    status: "pending",
                },
                include: {
                    order: {
                        include: { orderitem: { include: { item: true } } }
                    }
                }
            })
            res.status(201).json({ success: true, data: createPayment, message: "Payment added successfully" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const { payment_method, order_id } = req.body
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" })
            }
            const findOrder = await prisma.orders.findUnique({
                where: {
                    id: parseInt(order_id)
                },
                select: {
                    id: true,
                    total_amount: true
                }
            })
            console.log(findOrder)
            const transaction_id = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            const updatePayment = await prisma.payment.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    order_id: findOrder.id,
                    transaction_id: transaction_id,
                    payment_method: payment_method,
                    amount: findOrder.total_amount,
                    status: "pending",
                },
                include: {
                    order: {
                        include: { orderitem: { include: { item: true } } }
                    }
                }
            })
            res.status(201).json({ success: true, data: updatePayment, message: "Payment updated success fully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({
                    success: false,
                    message: "payment not found"
                })
            }
            res.status(500).json({ success: false, message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID Format" })
            }
            const result = await prisma.payment.delete({
                where: {
                    id: parseInt(id)
                }
            })
            res.json({ success: true, data: result, message: "Delete payment successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({
                    success: false,
                    message: "payment not found"
                })
            }
            res.status(500).json({ success: false, message: error.message })
        }
    }
}

module.exports = PaymentController