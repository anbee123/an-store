const mongoose = require('mongoose')
//this is our products schema
const productsSchema = new mongoose.Schema( {
    name: { type: String, required: true},
    description: {type: String, required: true },
    img: {type:String, required: true},
    price: { type : Number, required: true},
    qty: {type: Number, required: true}
   
})
//this is where we define our model using the schema we created
const Product = mongoose.model("Products", productsSchema)

//this is how we send vars to other files
module.exports = Product