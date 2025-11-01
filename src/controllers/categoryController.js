// const CategoryModel = require('../models/categoryModel')
const prisma = require("../config/connection")

// Category Controller With Prisma
const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await prisma.categories.findMany()
            res.json({ data: categories, message: "Get all categories" })
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
            const category = await prisma.categories.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if (!category) return res.status(404).json({ message: "Category not found" })
            res.json({ data: category })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    create: async (req, res) => {
        try {
            const { name } = req.body
            if (typeof name !== "string" || !name.trim() || name === null) {
                return res.status(400).json({ message: "Category name must be a non-empty string" });
            }
            const category = await prisma.categories.findUnique({
                where: {
                    name: name
                }
            })

            if (category) return res.status(400).json({ message: "Cateogry already exist" })
            const newCategory = await prisma.categories.create({
                data: {
                    name
                },
            })
            res.status(201).json({ data: newCategory, message: "Category added successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const { name } = req.body
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({

                    message: "Invalid ID format"
                })
            }

            if (typeof name !== "string" || !name.trim() || name === null) {
                return res.status(400).json({ message: "Category name must be a non-empty string" });
            }

            const updateCategory = await prisma.categories.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name
                }
            })
            res.status(201).json({ data: updateCategory, message: "Category updated successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({

                    message: "Category not found"
                })
            }
            res.status(500).json({ message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).json({

                    message: "Invalid ID format"
                })
            }
            const result = await prisma.categories.delete({
                where: {
                    id: parseInt(id)
                }
            })
            res.json({ data: result, message: "Category deleted successfully" })
        } catch (error) {
            if (error.code === "P2025") {
                return res.status(404).json({

                    message: "Category not found"
                })
            }
            res.status(500).json({ message: error.message })
        }
    }
}

// Category Manual
// const CategoryController = {
//     getAllCategory: async (req, res) => {
//         try {
//             const categories = await CategoryModel.getAllCategory()
//             res.json({ sueccess: true, data: categories })
//         } catch (error) {
//             res.status(500).json({  message: error.message })
//         }
//     },

//     getCategoryById: async (req, res) => {
//         try {
//             const category = await CategoryModel.getCategoryById(req.params.id)
//             if (!category) return res.status(404).json({ message: "Category not found" })
//             res.json({ success: true, data: category })
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message })
//         }
//     },

//     addCategory: async (req, res) => {
//         try {
//             const newCategory = await CategoryModel.addCategory(req.body)
//             res.status(201).json({ success: true, data: newCategory })
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message })
//         }
//     },

//     updateCategory: async (req, res) => {
//         try {
//             const updatedCategory = await CategoryModel.updateCategory(req.params.id, req.body)
//             res.json({ success: true, data: updatedCategory })
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message })
//         }
//     },

//     deleteCategory: async (req, res) => {
//         try {
//             const result = await CategoryModel.deleteCategory(req.params.id)
//             res.json({ sunccess: true, data: result })
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message })
//         }
//     }
// }

module.exports = CategoryController