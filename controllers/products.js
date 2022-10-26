// This is the controller file for products
const express = require('express')
const productRouter = express.Router()
const productData = require("../models/seed")
const Product = require('../models/product.js')