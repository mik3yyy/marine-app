const express = require('express');

const  authRoute= require('./routes/authenticateRoute');

const app = express();

app.use(express.json());

app.use('/auth',authRoute);


module.exports=app;