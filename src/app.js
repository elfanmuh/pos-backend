const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const itemRoutes = require("./routes/itemRoute")
const categoryRoutes = require("./routes/categoryRoute")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoute")
const authRoute = require("./routes/authRoute")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("API is running...")
})

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/items", itemRoutes)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/payments", paymentRoutes)

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app
