const router = require('express').Router();

router.get('/',isLoggedInAndVerified,(req,res)=>{
    res.render('profile',{user:req.user});
})
function isLoggedInAndVerified(req, res, next) {
    if (req.isAuthenticated() && req.user.active==true)
      return next();
    res.redirect('/');
  }
module.exports = router;