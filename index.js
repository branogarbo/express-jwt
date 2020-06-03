const express = require('express');
const app = express();
const port = 3000;

const index = require('./routes/index.js');

app.use('/', index);
   
app.all('*', (req,res)=>{
   res.sendStatus(404);
});

app.listen(port, console.log(`listening on port ${port}`));