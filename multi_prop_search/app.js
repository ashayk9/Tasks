const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');
const search_routes = require('./routes/search');
const SeedDb = require('./seed');

const app = express();
//SeedDb();
mongoose.connect("mongodb://localhost:27017/search_app", { useNewUrlParser: true });
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.use('/',search_routes);




app.listen(3000,(req,res)=>{
    console.log('server started');
})