const express = require('express')
const app = express()
const mongoose = require('mongoose')
const seedData = require('./models/seed.js')
const Product = require('./models/product.js')
const methodOverride = require("method-override")
//const productController = require ("./controllers/products")

require('dotenv').config()

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware//
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method"))

// Database Connection Logs
const db = mongoose.connection
db.on("error", (err) => console.log(err.message))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

//app.use("/products", productController)

// Seed
app.get("/products/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(seedData, (error, data) => {
      res.redirect("/products");
    });
  })

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
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
        res.redirect("/products")
      })
    })

//UPDATE//
app.put("/products/:id", (req, res) => {
   Product[req.params.id] = req.params.id
    res.redirect(`/products/${req.params.id}`)
})
//CREATE//
app.post("/products", (req, res) => {

    Product.create(req.body, (err, createdProduct)=> {
        console.log(err,createdProduct)
    res.redirect("/products")
})
})
//EDIT//
app.get("/products/:id/edit", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct)=>{
    res.render("edit.ejs", {
       foundProduct: foundProduct,
        index: req.params.id,
        tabTitle: "Edit",
})
})
})
//SHOW//
app.get("/products/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct)=>{
    res.render("show.ejs", {
        products: foundProduct,
       tabTitle: foundProduct.name,
    })
})
})














app.listen(PORT, ()=>{
    console.log(`living ${PORT}`)
});