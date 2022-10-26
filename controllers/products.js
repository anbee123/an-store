// This is the controller file for products
const express = require('express')
const productRouter = express.Router()
const productData = require("../models/seed")
const Product = require('../models/product.js')


//INDEX 
productRouter.get("/products", (req, res) => {
    Product.find({}, (error, allProducts) => {
      res.render("index.ejs", { products: allProducts })
    })
  })


















// Seed
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(productData, (error, data) => {
      res.redirect("/products");
    });
  })
  //module.exports = productRouter