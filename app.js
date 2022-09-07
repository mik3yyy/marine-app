const express = require('express');

const  authRoute= require('./routes/authenticateRoute');
const transferRoute =require('./routes/tranferRoute');
const app = express();

app.use(express.json());

app.use('/auth',authRoute);
app.use('/bank',transferRoute);



module.exports=app;