const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt")

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"] // ambil token dari headers
    if (!authHeader) return res.status(403).json({ message: "token tidak ditemukan" }) // kalau tidak ada

    const token = authHeader.split(" ")[1]
    if (!token) return res.status(403).json({ message: "token tidak valid" }) // kalau token salah

    try {
        const decoded = jwt.verify(token, secret) // cek token jwt
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "token tidak valid atau expired" })
    }
}

module.exports = { verifyToken }