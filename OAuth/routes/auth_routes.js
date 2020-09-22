const passport = require('../config/passport_setup');
const router = require('express').Router();


router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile');
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;