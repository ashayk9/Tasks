const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    googleId:String,
    password:String,
    secret:String,
    token:String,
    active:Boolean
})
module.exports = mongoose.model('User',userSchema);