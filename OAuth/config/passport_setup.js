const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const Keys = require('./keys');

passport.serializeUser(function(user, done) {
     done(null,user.id);
  });

passport.deserializeUser(function(id, done) {
   User.findById(id)
   .then(user=>{
       done(null,user);
   })
   })

passport.use('google',new GoogleStrategy({
    callbackURL :'/auth/google/redirect',
    clientID:Keys.google.clientID,
    clientSecret:Keys.google.clientSecret
},(accesstoken,refreshtoken,profile,done)=>{
    //console.log(profile);
    User.findOne({googleId:profile.id},(err,currentUser)=>{
        if(err){
            console.log(err);
        }
        else{
            if(currentUser){
                console.log('user is : '+ currentUser);
                done(null,currentUser);
            }
            else{
                console.log(profile);
                const newUser = User.create({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.picture
                })
                .then(newUser=>{
                    console.log('new user is : '+ newUser);
                    done(null,newUser);
                })
                
                
                
            }
        }
        
    })
}))

module.exports=passport;