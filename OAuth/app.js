const express = require('express');
const auth_routes = require('./routes/auth_routes');
const profile_routes = require('./routes/profile_routes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const Keys = require('./config/keys');
//const passportSetup = require('./config/passport_setup');
const passport = require('passport');
const app = express();

mongoose.connect("mongodb://localhost:27017/oauth2_google", { useNewUrlParser: true });

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
app.listen(3000,function(){
    console.log("server started");
});