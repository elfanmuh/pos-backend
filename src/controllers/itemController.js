// const ItemModel = require("../models/itemModel")
const prisma = require("../config/connection")

// Item Controller With Prisma
const ItemController = {
    getAll: async (req, res) => {
        try {
            const items = await prisma.items.findMany()
            res.status(200).json({ data: items, message: "Get all items" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" })
            }
            const item = await prisma.items.findUnique({
                where: { id: parseInt(id) }
            })
            if (!item) return res.status(404).json({ message: "Item not found" })
            res.json({ data: item })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const { name, price, description, image, category_id } = req.body

            if (typeof name !== "string" || !name.trim() || name === null) {
                return res.status(400).json({ message: "Item name must be a non-empty string" });
            }

            const item = await prisma.items.findUnique({
                where: {
                    name: name
                }
            })

            if (item) return res.status(400).json({ message: "Item already exist" })

            if (typeof price !== "number") return res.status(400).json({ message: "Price must be number" })

            if (typeof category_id !== "number" || category_id === null) return res.status(400).json({ message: "Invalid Category" })

            const newItem = await prisma.items.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    image: image,
                    category_id: category_id
                }
            })
            res.status(201).json({ data: newItem, message: "Item added successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id
            const { name, price, description, image, category_id } = req.body
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" })
            }

            if (typeof price !== "number") return res.status(400).json({ message: "Price must be number" })

            if (typeof name !== "string" || !name.trim() || name === null) {
                return res.status(400).json({ message: "Item name must be a non-empty string" });
            }

            const updateItem = await prisma.items.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: name,
                    price: price,
                    description: description,
                    image: image,
                    category_id: category_id
                }
            })
            res.status(201).json({ data: updateItem, message: "Item updated successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({

                    message: "Item not found"
                })
            }
            res.status(500).json({ message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" })
            }
            const deleteItem = await prisma.items.delete({
                where: {
                    id: parseInt(id)
                }
            })
            res.json({ data: deleteItem, message: "Item deleted succesfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({

                    message: "Item not found"
                })
            }
            res.status(500).json({ message: error.message })
        }
    }
}


module.exports = ItemController
