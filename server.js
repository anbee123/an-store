const express = require('express')
const app = express()
const mongoose = require('mongoose')
const seedData = require('./models/seed.js')
const Product = require('./models/product.js')
//const productController = require ("./controllers/products")

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

//app.use("/products", productController)

//INDEX 
app.get("/products", (req, res) => {
    Product.find({}, (error, allProducts) => {
      res.render("index.ejs", { products: allProducts })
    })
  })
  //NEW//
app.get("/products/new", (req, res) => {
    res.render("new.ejs")
})
//DELETE//
app.delete("/products/:id", (req, res) => {
    Product.splice(req.params.id, 1)
    res.redirect("/products")
})
//UPDATE//
app.put("/products/:id", (req, res) => {
   Product[req.params.id] = req.params.id
    res.redirect("/products")
})
//CREATE//
app.post("/products", (req, res) => {
    //console.log(req.body)
    Product.push(req.params.id)
    res.redirect("/products")
})
//EDIT//
app.get("/products/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        data: Product[req.params.id],
        index: req.params.id
    })
})
//SHOW//
app.get("/products/:id", (req, res) => {
    res.render("show.ejs", {
        data: Product[req.params.id]
    })
})

// Seed
app.get("/products/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(seedData, (error, data) => {
      res.redirect("/products");
    });
  })














app.listen(PORT, ()=>{
    console.log(`living ${PORT}`)
});