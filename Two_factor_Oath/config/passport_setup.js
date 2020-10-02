const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Keys = require('./keys');
const speakeasy = require('speakeasy');

passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(function(id,done){
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
                var secret = speakeasy.generateSecret({length: 30}); 
                    console.log(secret.base32); //using speakeasy generate one time token. 
                    currentUser.secret = secret.base32;

                    var token = speakeasy.totp({ 
                        secret: secret.base32, 
                        encoding: 'base32', 
                    }); 
                    console.log(token);
                    currentUser.token = token;

                    currentUser.active = false;
                    currentUser.save()
                done(null,currentUser);
            }
            else{
                console.log(profile);
                const newUser = new User({
                    username:profile.displayName,
                    googleId:profile.id,
                })
                var secret = speakeasy.generateSecret({length: 30}); 
                    console.log(secret.base32); //using speakeasy generate one time token. 
                    newUser.secret = secret.base32;

                    var token = speakeasy.totp({ 
                        secret: secret.base32, 
                        encoding: 'base32', 
                    }); 
                    console.log(token);
                    newUser.token = token;

                    newUser.active = false;
                    newUser.save()
                .then(newUser=>{
                    console.log('new user is : '+ newUser);
                    done(null,newUser);
                })
                
                
                
            }
        }
        
    })
}))

passport.use('local-signup',new LocalStrategy({usernameField:'username'},(username,password,done)=>{
    console.log(username,password);
    User.findOne({username:username})
    .then(user=>{
        if(!user){
            const newUser = new User({username,password});
            bcrypt.hash(newUser.password,10,function(err,hash){
                if(err) throw err;
                newUser.password=hash;
                newUser.save()
                .then(user=>{
                    console.log(newUser);
                    return done(null,user);
                })
                .catch(err=>{
                    return done(null,false,{message:err});
                })
            })
        }
    })
    .catch(err=>{
        return done(null,false,{message:err});
    })
}))
// passport.use('local-signin', new LocalStrategy({usernameField:'username'},(username,password,done)=>{
    
//     User.findOne({username:username})
//     .then(user=>{
//         if(!user){
//             return(null,false);
//         }
//         else if(user){
//             bcrypt.compare(password,user.password,(err,isMatch)=>{
//                 if(err) throw err;

//                 if(isMatch){
//                     var secret = speakeasy.generateSecret({length: 30}); 
//                     console.log(secret.base32); //using speakeasy generate one time token. 

//                     var token = speakeasy.totp({ 
//                         secret: secret.base32, 
//                         encoding: 'base32', 
//                     }); 
//                     console.log(token);
//                     return done(null,user);
//                 }else{
//                     return done(null,false,{message:"wrong password"});
//                 }
                
//             })
//         }
//     })
//     .catch(err=>{
//         return done(null,false,{message:err});
//     });
// }))

passport.use('local-signin', new LocalStrategy({usernameField:'username'},(username,password,done)=>{
    
    User.findOne({username:username})
    .then(user=>{
        if(!user){
            return(null,false);
        }
        else if(user){
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    var secret = speakeasy.generateSecret({length: 30}); 
                    console.log(secret.base32); //using speakeasy generate one time token. 
                    user.secret = secret.base32;

                    var token = speakeasy.totp({ 
                        secret: secret.base32, 
                        encoding: 'base32', 
                    }); 
                    console.log(token);
                    user.token = token;

                    user.active = false;
                    user.save()
                    
                    return done(null,user);
                    
                }else{
                    return done(null,false,{message:"wrong password"});
                }
                
            })
        }
    })
    .catch(err=>{
        return done(null,false,{message:err});
    });
}))




module.exports = passport;