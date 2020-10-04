const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name:String,
    price:Number,
    storage:String,
    ram:String,
    colour:String,
    img:String
})

module.exports = mongoose.model('Product',productSchema);