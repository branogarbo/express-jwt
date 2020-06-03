const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

require('dotenv').config();

const app = express();
const port = 3000;

const jwtCheck = expressjwt({
   secret: process.env.JWT_SECRET_KEY
});

app.get('/login', (req,res)=>{
   const token = jwt.sign({
      sub: '< user id >',
      name:'eric',
      iat: Math.round(new Date().getTime() / 1000)
   }, process.env.JWT_SECRET_KEY, {expiresIn: '2 hours'});

   res.json({access_token: token});
});

app.get('/public', (req,res)=>{
   res.send('everyone can see this');
});

app.get('/private', jwtCheck, (req,res)=>{
   res.send('only logged in users can see this');
});
   
app.get('*', (req,res)=>{
   res.sendStatus(404);
});

app.listen(port, console.log(`listening on port ${port}`));