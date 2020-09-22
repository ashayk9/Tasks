const router = require('express').Router();

router.get('/',isLoggedIn,(req,res)=>{
    res.render('profile',{user:req.user});
})
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
module.exports = router;