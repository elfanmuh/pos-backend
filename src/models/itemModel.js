const db = require("../config/connection")

// Model SQL With Prisma


// Model SQL Manual
const ItemModel = {
  getAll: async () => {
    const [rows] = await db.query(`
            SELECT
              items.id,
              items.name,
              items.price,
              items.category_id,
              categories.name AS category_name,
              items.description,
              items.image
            FROM items
            INNER JOIN categories ON items.category_id = categories.id
            ORDER BY items.id DESC
          `)
    return rows
  },

  getById: async (id) => {
    const [rows] = await db.query(`
            SELECT
              items.id,
              items.name,
              items.price,
              items.category_id,
              categories.name AS category_name,
              items.description,
              items.image
            FROM items
            INNER JOIN categories ON items.category_id = categories.id
            WHERE items.id = ?
          `, [id])
    return rows[0]
  },

  create: async (data) => {
    const { name, price, category_id, description, image } = data
    const [result] = await db.query("INSERT INTO items (name, price, category_id, description, image ) VALUES (?, ?, ?, ?, ?)", [name, price, category_id, description, image])
    return { id: result.insertId, ...data }
  },

  update: async (id, data) => {
    const { name, price, category_id, description, image } = data
    await db.query("UPDATE items SET name = ?, price = ?, category_id = ?, description = ?, image = ? WHERE id = ?", [name, price, category_id, description, image, id])
    return { id, ...data }
  },

  delete: async (id) => {
    await db.query("DELETE FROM items WHERE id = ?", [id])
    return { message: "Item deleted" }
  },
}
