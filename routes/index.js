const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const router = express.Router();
require('dotenv').config();

const jwtCheck = expressjwt({
   secret: process.env.JWT_SECRET_KEY
});

/////////////////////// route middleware ///////////////////////////

router.get('/login', (req,res)=>{
   const token = jwt.sign({
      sub: '< user id >',
      name:'eric',
      iat: Math.round(new Date().getTime() / 1000)
   }, process.env.JWT_SECRET_KEY, {expiresIn: '2 hours'});

   res.json({access_token: token});
});

router.get('/public', (req,res)=>{
   res.send('everyone can see this');
});

router.get('/private', jwtCheck, (req,res)=>{
   res.send('only logged in users can see this');
});

//////////////////////////////////////////////////////////////////

module.exports = router;