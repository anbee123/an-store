const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productController = require ("./controllers/products")

require('dotenv').config()

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Database Connection Logs
const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

















app.listen(3017, ()=>{
    console.log("living")
});