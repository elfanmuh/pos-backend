const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt")

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    if (!authHeader) return res.status(403).json({ message: "token tidak ditemukan" })

    const token = authHeader.split(" ")[1]
    if (!token) return res.status(403).json({ message: "token tidak valid" })

    try {
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "token tidak valid atau expired" })
    }
}

module.exports = { verifyToken }