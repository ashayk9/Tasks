const express = require('express').Router();
const Speakeasy = require('speakeasy');
const bodyParser = require('body-parser');
const router = require('./auth_routes');

router.post('/totp-secret',(req,res,next)=>{
    const secret = Speakeasy.generateSecret({length:20});
    res.send({"secret":secret.base32});
})
router.post('/totp_generate',(req,res,next)=>{
    res.send({
        "token":Speakeasy.totp({
            secret:req.body.secret,
            encoding:base32
        }),
        "remaining":(60-Math.floor((new Date().getTime()/1000 % 60)))
    })
})
router.post('/totp-validate',(req,res,next)=>{
    res.send({
        "valid":Speakeasy.totp.verify({
            secret = re
        })
    })
})