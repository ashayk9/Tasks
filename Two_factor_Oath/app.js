const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const auth_routes = require('./routes/auth_routes');
const profile_routes = require('./routes/profile_routes');
const Keys = require('./config/keys');

const app = express();

mongoose.connect("mongodb://localhost:27017/2factor_oauth", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[Keys.session.secret]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',auth_routes);
app.use('/profile',profile_routes);   

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(3000,()=>{
    console.log('server started');
})