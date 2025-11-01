const prisma = require("../config/connection")

const ordersController = {
    getAll: async (req, res) => {
        try {
            const orders = await prisma.orders.findMany({
                include: {
                    orderitem: {
                        include: { item: true }
                    }
                }
            })
            res.json({ success: true, data: orders, message: "Get all orders" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" })
            }
            const order = await prisma.orders.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    orderitem: {
                        include: { item: true }
                    }
                }
            })
            if (!order) return res.status(404).json({ success: false, message: "Order not found" })
            res.json({ success: true, data: order, message: "Get order" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const { customer_name, items } = req.body
            const itemId = items.map(i => i.item_id) // mendapatkan id item dari item yang dipilih
            if (typeof customer_name !== "string" || !customer_name.trim()) {
                return res.status(400).json({ success: false, message: "Customer name must be a non-empty string" });
            }

            // validasi items harus array
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ success: false, message: "Items must be a non-empty array" });
            }

            // validasi setiap item di dalam array
            for (const i of items) {
                if (typeof i.item_id !== "number") {
                    return res.status(400).json({ success: false, message: "Item ID must be a number" });
                }
                if (typeof i.quantity !== "number") {
                    return res.status(400).json({ success: false, message: "Quantity must be a number" });
                }
            }
            const item = await prisma.items.findMany({ // mengambil data item berdasarkan id diatas
                where: {
                    id: {
                        in: itemId // id dari item id dari response
                    }
                },
                select: { // ambil datanya
                    id: true,
                    name: true,
                    price: true
                }
            })
            let total_amount = 0
            const orderItemData = items.map(i => { // membuat order item
                const found = item.find(db => db.id === i.item_id) // mengambil item dari database item yang cocok dengan id dari response
                const subtotal = found.price * i.quantity
                total_amount += subtotal // total_amount = total_amount + subtotal
                return {
                    item_id: i.item_id,
                    quantity: i.quantity,
                    subtotal: subtotal
                }
            })
            const newOrder = await prisma.orders.create({
                data: {
                    customer_name: customer_name,
                    total_amount: total_amount,
                    status: "pending",
                    orderitem: { create: orderItemData }
                },
                include: {
                    orderitem: {
                        include: { item: true }
                    }
                }
            })
            res.status(201).json({ success: true, data: newOrder, message: "Order added successfully" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const { customer_name, items } = req.body
            const itemId = items.map(i => i.item_id)
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" })
            }
            const item = await prisma.items.findMany({ // mengambil data item berdasarkan id diatas
                where: {
                    id: {
                        in: itemId // id dari item id dari response
                    }
                },
                select: { // ambil datanya
                    id: true,
                    name: true,
                    price: true
                }
            })
            let total_amount = 0
            await prisma.orderItem.deleteMany({
                where: {
                    order_id: parseInt(id)
                }
            })
            const orderItemData = items.map(i => { // membuat order item
                const found = item.find(db => db.id === i.item_id) // mengambil item dari database item yang cocok dengan id dari response
                const subtotal = found.price * i.quantity
                total_amount += subtotal // total_amount = total_amount + subtotal
                return {
                    item_id: i.item_id,
                    quantity: i.quantity,
                    subtotal: subtotal
                }
            })
            const updateOrder = await prisma.orders.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    customer_name: customer_name,
                    total_amount: total_amount,
                    status: "pending",
                    orderitem: { create: orderItemData }
                },
                include: {
                    orderitem: {
                        include: { item: true }
                    }
                }
            })
            res.status(201).json({ success: true, data: updateOrder, message: "Order updated successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                })
            }
            res.status(500).json({ success: false, message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" })
            }
            await prisma.orderItem.deleteMany({ where: { order_id: parseInt(id) } })
            const result = await prisma.orders.delete({
                where: {
                    id: parseInt(id)
                }
            })
            res.json({ success: true, data: result, message: "Order deleted successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                })
            }
            res.status(500).json({ success: false, message: error.message })
        }
    }
}

module.exports = ordersController