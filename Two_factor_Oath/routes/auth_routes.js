const passport = require('../config/passport_setup');
const router = require('express').Router();
const User = require('../models/user');
const speakeasy = require('speakeasy');
const { google } = require('../config/keys');

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/auth/verify');
})

router.get('/logout',(req,res)=>{
    var user = req.user;
    user.active = false;
    user.save();
    req.logout();
    res.redirect('/');
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})
router.get('/register',(req,res)=>{
    res.render('auth/register');
})
router.get('/verify',(req,res)=>{
    console.log('hi');
    console.log(req.user);
    res.render('auth/verify');
})

router.post('/register', passport.authenticate('local-signup',
    { 
      successRedirect: '/auth/login',
      failureRedirect: '/'
    }
  ))
router.post('/login', passport.authenticate('local-signin',
  {
    //successFlash:`logged in successfully `,//welcome ${currentUser.username}
    successRedirect: '/auth/verify',
    //failureFlash:"incorrect username or password",
    failureRedirect: '/'
  }
))
router.post('/verify',(req,res)=>{
    var currentUser = req.user;
    User.findOne({username:currentUser.username})
    .then(user=>{
        
        //This method can be used to verify the one time password entered by the user.
        var tokenValidates = speakeasy.totp.verify({ 
            secret: user.secret,    
            encoding: 'base32',    
            token: user.token, 
            window: 0
            }); 
        console.log(tokenValidates); 
        user.active = tokenValidates;
        user.save()
        //res.send('result is:'+ tokenValidates);
        res.render('profile',{user:currentUser});
    })
})

module.exports = router;