const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { secret } = require("../config/jwt")
const prisma = require("../config/connection")

const authController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body

            const extingUser = await prisma.users.findUnique({
                where: {
                    username: username
                }
            })
            if (extingUser) return res.status(400).json({ message: "Username already used" })

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword
                }
            })

            res.status(201).json({ message: "User added successfully", username: newUser.username })
        } catch (error) {
            res.status(500).json({ message: "User failed to add" + error.message })
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const user = await prisma.users.findUnique({
                where: {
                    username: username
                }
            })
            if (!user) return res.status(400).json({ message: "User tidak ditemukan" })

            const validPass = await bcrypt.compare(password, user.password)
            if (!validPass) return res.status(400).json({ message: "Password salah" })

            const token = jwt.sign({
                id: user.id,
                username: user.username,
            },
                secret,
                {
                    expiresIn: "1h"
                }
            )

            res.json({ message: "Login Berhasil", token })
        } catch (error) {
            res.status(500).json({ message: "login gagal" + error.message })
        }
    },

    profile: async (req, res) => {
        try {
            res.status(200).json({ message: "ini data profile", user: req.user })
        } catch (error) {
            res.status(500).json({ message: "gagal mendapatkan profile" })
        }
    }
}

module.exports = authController