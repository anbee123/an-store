const express = require('express')
const app = express()
const mongoose = require('mongoose')
const seedData = require('./models/seed.js')
const Product = require('./models/product.js')
const methodOverride = require("method-override")
const productsController = require ("./controllers/products")

require('dotenv').config()

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware//
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use("/products", productsController)
// Database Connection Logs
const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

//app.use("/products", productsController)














app.listen(PORT, () => {
  console.log(`living ${PORT}`)
});