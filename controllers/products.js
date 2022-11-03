// This is the controller file for products
const express = require('express')
const productRouter = express.Router()
const productData = require("../models/seed")
const Product = require('../models/product.js')


// Seed
productRouter.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, allProducts) => { })
  Product.create(productData, (error, data) => {
    res.redirect("/products");
  });
})

//INDEX 
productRouter.get("/", (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render("index.ejs", { products: allProducts })
  })
})
//NEW//
productRouter.get("/new", (req, res) => {
  res.render("new.ejs")
})
//DELETE//
productRouter.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    res.redirect("/products")
  })
})

//UPDATE//
productRouter.put("/:id", (req, res) => {
  console.log(req.body)
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, purchasedProducts) => {
      purchasedProducts.qty -= 1
      purchasedProducts.save()
      res.redirect(`/products/${req.params.id}`)
    })
  })

//order route //
productRouter.put("/order/:id", (req, res) => {

  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, purchasedProducts) => {
      purchasedProducts.qty -= 1
      purchasedProducts.save()
      res.redirect(`/products/${req.params.id}`)
    })
})

//CREATE//
productRouter.post("/", (req, res) => {

  Product.create(req.body, (err, createdProduct) => {
    console.log(err, createdProduct)
    res.redirect("/products")
  })
})
//EDIT//
productRouter.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("edit.ejs", {
      foundProduct: foundProduct,
      index: req.params.id,
      tabTitle: "Edit",
    })
  })
})
//SHOW//
productRouter.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      products: foundProduct,
      tabTitle: foundProduct.name,
    })
  })
})


















// Seed
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {})
    Product.create(productData, (error, data) => {
      res.redirect("/products");
    });
  })
  module.exports = productRouter