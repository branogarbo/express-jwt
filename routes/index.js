const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const jwtCheck = (req,res,next) => {
   const authHeader = req.headers.authorization;

   if (authHeader) {
      const token = authHeader.split(' ')[1]

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err,payload)=>{
         if (err) {
            return res.sendStatus(403);
         }

         req.payload = payload;
         res.send(req.payload);
         next();
      });
   }
   else {
      res.sendStatus(401);
   }
};

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