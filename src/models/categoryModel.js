const db = require('../config/connection')

// Model SQL With Prisma


// Model SQL Manual
const CategoryModel = {
    getAllCategory: async () => {
        const sql = `SELECT * FROM categories`
        const [rows] = await db.query(sql)
        return rows
    },
    getCategoryById: async (id) => {
        const sql = `SELECT * FROM categories WHERE id = ?`
        const [rows] = await db.query(sql, [id])
        return rows[0]
    },
    addCategory: async (data) => {
        const sql = `INSERT INTO categories (name) VALUES (?)`
        const [result] = await db.query(sql, [data.name])
        return { id: result.insertId, ...data }
    },
    updateCategory: async (id, data) => {
        const sql = `UPDATE categories SET name = ? WHERE id = ?`
        await db.query(sql, [data.name, id])
        return { id, ...data }
    },
    deleteCategory: async (id) => {
        const sql = `DELETE FROM categories WHERE id = ?`
        await db.query(sql, id)
        return { message: "category deleted successfully" }
    }
}
